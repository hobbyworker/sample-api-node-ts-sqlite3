import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath: string = path.join(__dirname, '../../mydatabase.db');

let db: sqlite3.Database | null = null;

// Initialize the SQLite database and create tables if they do not exist.
export function initializeDB(): void {
  db = new sqlite3.Database(dbPath, (err: Error | null) => {
    if (err) {
      console.error('Failed to connect to SQLite DB:', err);
    } else {
      console.log('Successfully connected to SQLite DB.');
    }
  });

  // Create the items table if it doesn't exist
  db.run(
    `
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT
    )
    `,
    (err: Error | null) => {
      if (err) {
        console.error('Error while creating table:', err);
      } else {
        console.log('Items table is ready.');
      }
    }
  );
}

// Retrieve the initialized database instance. Throws an error if the DB is not initialized.
export function getDB(): sqlite3.Database {
  if (!db) {
    throw new Error('Database not initialized. Please call initializeDB() first.');
  }
  return db;
}
