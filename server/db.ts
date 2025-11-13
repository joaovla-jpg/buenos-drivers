import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, respondents as respondentsTable, Respondent } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Analysis queries for Buenos Drivers case
export async function getAnalysisData() {
  const db = await getDb();
  if (!db) return null;

  const data = await db.select().from(respondentsTable);
  return data;
}

export async function getCorrelationAnalysis() {
  const db = await getDb();
  if (!db) return null;

  // Get all respondents
  const data = await db.select().from(respondentsTable);
  
  // Calculate correlations between drivers and intention
  const mappedData = data.map((r: Respondent) => ({
    confidence: (r.indexConfidence || 0) / 100,
    security: (r.indexSecurity || 0) / 100,
    communication: (r.indexCommunication || 0) / 100,
    aversion: (r.indexAversion || 0) / 100,
    intention: (r.indexIntention || 0) / 100,
  }));

  // Calculate Pearson correlations
  const correlations = {
    confidence: calculateCorrelation(mappedData.map(d => d.confidence), mappedData.map(d => d.intention)),
    security: calculateCorrelation(mappedData.map(d => d.security), mappedData.map(d => d.intention)),
    communication: calculateCorrelation(mappedData.map(d => d.communication), mappedData.map(d => d.intention)),
    aversion: calculateCorrelation(mappedData.map(d => d.aversion), mappedData.map(d => d.intention)),
  };

  return correlations;
}

export async function getSegmentationAnalysis() {
  const db = await getDb();
  if (!db) return null;

  const data = await db.select().from(respondentsTable);
  
  // Segment by intention (high >= 5.0, low < 5.0)
  const highIntention = data.filter((r: Respondent) => (r.indexIntention || 0) >= 500);
  const lowIntention = data.filter((r: Respondent) => (r.indexIntention || 0) < 500);

  return {
    highIntention: {
      count: highIntention.length,
      avgConfidence: highIntention.reduce((sum: number, r: Respondent) => sum + (r.indexConfidence || 0), 0) / highIntention.length / 100,
      avgSecurity: highIntention.reduce((sum: number, r: Respondent) => sum + (r.indexSecurity || 0), 0) / highIntention.length / 100,
      avgCommunication: highIntention.reduce((sum: number, r: Respondent) => sum + (r.indexCommunication || 0), 0) / highIntention.length / 100,
    },
    lowIntention: {
      count: lowIntention.length,
      avgConfidence: lowIntention.reduce((sum: number, r: Respondent) => sum + (r.indexConfidence || 0), 0) / lowIntention.length / 100,
      avgSecurity: lowIntention.reduce((sum: number, r: Respondent) => sum + (r.indexSecurity || 0), 0) / lowIntention.length / 100,
      avgCommunication: lowIntention.reduce((sum: number, r: Respondent) => sum + (r.indexCommunication || 0), 0) / lowIntention.length / 100,
    },
  };
}

// Helper function to calculate Pearson correlation
function calculateCorrelation(x: number[], y: number[]): number {
  const n = x.length;
  const meanX = x.reduce((a: number, b: number) => a + b) / n;
  const meanY = y.reduce((a: number, b: number) => a + b) / n;
  
  const numerator = x.reduce((sum: number, xi: number, i: number) => sum + (xi - meanX) * (y[i] - meanY), 0);
  const denominatorX = Math.sqrt(x.reduce((sum: number, xi: number) => sum + Math.pow(xi - meanX, 2), 0));
  const denominatorY = Math.sqrt(y.reduce((sum: number, yi: number) => sum + Math.pow(yi - meanY, 2), 0));
  
  return numerator / (denominatorX * denominatorY);
}
