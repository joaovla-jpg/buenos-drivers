import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Research respondents table - stores demographic and psychographic data
 */
export const respondents = mysqlTable("respondents", {
  id: int("id").autoincrement().primaryKey(),
  // Demographics
  gender: varchar("gender", { length: 50 }),
  income: varchar("income", { length: 100 }),
  age: int("age"),
  isBuenosAires: int("is_buenos_aires").default(0),
  children: varchar("children", { length: 50 }),
  // Risk Aversion (4 items, scale 1-7)
  aversion1: int("aversion1"),
  aversion2: int("aversion2"),
  aversion3: int("aversion3"),
  aversion4: int("aversion4"),
  // Trust/Confidence (9 items, scale 1-7)
  confidence1: int("confidence1"),
  confidence2: int("confidence2"),
  confidence3: int("confidence3"),
  confidence4: int("confidence4"),
  confidence5: int("confidence5"),
  confidence6: int("confidence6"),
  confidence7: int("confidence7"),
  confidence8: int("confidence8"),
  confidence9: int("confidence9"),
  // Security (3 items, scale 1-7)
  security1: int("security1"),
  security2: int("security2"),
  security3: int("security3"),
  // Intention to Use (3 items, scale 1-7)
  intention1: int("intention1"),
  intention2: int("intention2"),
  intention3: int("intention3"),
  // Communication/Recall (7 items, scale 1-7)
  communication1: int("communication1"),
  communication2: int("communication2"),
  communication3: int("communication3"),
  communication4: int("communication4"),
  communication5: int("communication5"),
  communication6: int("communication6"),
  communication7: int("communication7"),
  // Composite indices (calculated)
  indexAversion: int("index_aversion").default(0), // Store as integer (0-700 for scale 1-7 * 100)
  indexConfidence: int("index_confidence").default(0),
  indexSecurity: int("index_security").default(0),
  indexIntention: int("index_intention").default(0),
  indexCommunication: int("index_communication").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Respondent = typeof respondents.$inferSelect;
export type InsertRespondent = typeof respondents.$inferInsert;