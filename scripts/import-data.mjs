import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ExcelJS from 'exceljs';
import mysql from 'mysql2/promise';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Database configuration from environment
const DB_CONFIG = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'buenos_drivers',
  connectionLimit: 5,
};

// Parse the DATABASE_URL if provided
if (process.env.DATABASE_URL) {
  const url = new URL(process.env.DATABASE_URL);
  DB_CONFIG.host = url.hostname;
  DB_CONFIG.user = url.username;
  DB_CONFIG.password = url.password;
  DB_CONFIG.database = url.pathname.slice(1);
  // Enable SSL for TiDB Cloud
  DB_CONFIG.ssl = { rejectUnauthorized: false };
}

async function importData() {
  const excelPath = path.join(__dirname, '../upload/BASE_BUENOS_DRIVERS211.xlsx');
  
  if (!fs.existsSync(excelPath)) {
    console.error(`Excel file not found at ${excelPath}`);
    process.exit(1);
  }

  // Read Excel file
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(excelPath);
  
  const worksheet = workbook.getWorksheet('BASE_NUMERICA');
  if (!worksheet) {
    console.error('Worksheet BASE_NUMERICA not found');
    process.exit(1);
  }

  // Get headers from first row
  const headers = [];
  worksheet.getRow(1).eachCell((cell) => {
    headers.push(cell.value);
  });

  console.log(`Found ${headers.length} columns:`, headers);

  // Prepare data rows
  const rows = [];
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return; // Skip header
    
    const rowData = {};
    row.eachCell((cell, colNumber) => {
      const header = headers[colNumber - 1];
      if (header) {
        rowData[header] = cell.value;
      }
    });
    
    if (Object.keys(rowData).length > 0) {
      rows.push(rowData);
    }
  });

  console.log(`Read ${rows.length} data rows from Excel`);

  // Connect to database
  const connection = await mysql.createConnection(DB_CONFIG);

  try {
    // Clear existing data
    await connection.execute('DELETE FROM respondents');
    console.log('Cleared existing respondents');

    // Prepare batch insert
    const batchSize = 100;
    for (let i = 0; i < rows.length; i += batchSize) {
      const batch = rows.slice(i, i + batchSize);
      
      for (const row of batch) {
        // Map Excel columns to database columns
        const respondent = {
          gender: row['Genero'] || null,
          income: row['Renda_Individual'] || null,
          age: parseInt(row['Idade']) || null,
          is_buenos_aires: row['Cidade_é_buenos_aires'] ? 1 : 0,
          children: row['Filhos'] || null,
          // Risk Aversion
          aversion1: parseInt(row['Aversao1']) || null,
          aversion2: parseInt(row['Aversao2']) || null,
          aversion3: parseInt(row['Aversao3']) || null,
          aversion4: parseInt(row['Aversao4']) || null,
          // Confidence
          confidence1: parseInt(row['Confianca1']) || null,
          confidence2: parseInt(row['Confianca2']) || null,
          confidence3: parseInt(row['Confianca3']) || null,
          confidence4: parseInt(row['Confianca4']) || null,
          confidence5: parseInt(row['Confianca5']) || null,
          confidence6: parseInt(row['Confianca6']) || null,
          confidence7: parseInt(row['Confianca7']) || null,
          confidence8: parseInt(row['Confianca8']) || null,
          confidence9: parseInt(row['Confianca9']) || null,
          // Security
          security1: parseInt(row['Segurança1']) || null,
          security2: parseInt(row['Segurança2']) || null,
          security3: parseInt(row['Segurança3']) || null,
          // Intention
          intention1: parseInt(row['Intenção1']) || null,
          intention2: parseInt(row['Intenção2']) || null,
          intention3: parseInt(row['Intenção3']) || null,
          // Communication
          communication1: parseInt(row['Comunicacao1']) || null,
          communication2: parseInt(row['Comunicacao2']) || null,
          communication3: parseInt(row['Comunicacao3']) || null,
          communication4: parseInt(row['Comunicacao4']) || null,
          communication5: parseInt(row['Comunicacao5']) || null,
          communication6: parseInt(row['Comunicacao6']) || null,
          communication7: parseInt(row['Comunicacao7']) || null,
        };

        // Calculate composite indices (average * 100 for integer storage)
        const aversions = [respondent.aversion1, respondent.aversion2, respondent.aversion3, respondent.aversion4].filter(v => v !== null);
        respondent.index_aversion = aversions.length > 0 ? Math.round((aversions.reduce((a, b) => a + b, 0) / aversions.length) * 100) : 0;

        const confidences = [respondent.confidence1, respondent.confidence2, respondent.confidence3, respondent.confidence4, respondent.confidence5, respondent.confidence6, respondent.confidence7, respondent.confidence8, respondent.confidence9].filter(v => v !== null);
        respondent.index_confidence = confidences.length > 0 ? Math.round((confidences.reduce((a, b) => a + b, 0) / confidences.length) * 100) : 0;

        const securities = [respondent.security1, respondent.security2, respondent.security3].filter(v => v !== null);
        respondent.index_security = securities.length > 0 ? Math.round((securities.reduce((a, b) => a + b, 0) / securities.length) * 100) : 0;

        const intentions = [respondent.intention1, respondent.intention2, respondent.intention3].filter(v => v !== null);
        respondent.index_intention = intentions.length > 0 ? Math.round((intentions.reduce((a, b) => a + b, 0) / intentions.length) * 100) : 0;

        const communications = [respondent.communication1, respondent.communication2, respondent.communication3, respondent.communication4, respondent.communication5, respondent.communication6, respondent.communication7].filter(v => v !== null);
        respondent.index_communication = communications.length > 0 ? Math.round((communications.reduce((a, b) => a + b, 0) / communications.length) * 100) : 0;

        // Insert into database
        const columns = Object.keys(respondent);
        const values = Object.values(respondent);
        const placeholders = columns.map(() => '?').join(',');
        const query = `INSERT INTO respondents (${columns.join(',')}) VALUES (${placeholders})`;
        
        await connection.execute(query, values);
      }
      
      console.log(`Imported ${Math.min(i + batchSize, rows.length)} / ${rows.length} rows`);
    }

    console.log('✓ Data import completed successfully!');
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

importData().catch(console.error);
