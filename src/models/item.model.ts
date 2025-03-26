import sqlite3 from 'sqlite3';
import { getDB } from '../config/db';

export interface Item {
  id: number;
  name: string;
  description?: string;
}

// Create a new item in the database
export function createItem(name: string, description: string): Promise<Item> {
  return new Promise((resolve, reject) => {
    const db = getDB();
    db.run(
      'INSERT INTO items (name, description) VALUES (?, ?)',
      [name, description],
      function (this: sqlite3.RunResult, err: Error | null) {
        if (err) return reject(err);
        resolve({ id: this.lastID, name, description });
      }
    );
  });
}

// Retrieve all items from the database
export function getAllItems(): Promise<Item[]> {
  return new Promise((resolve, reject) => {
    const db = getDB();
    db.all('SELECT * FROM items', [], (err: Error | null, rows: Item[]) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

// Retrieve a single item by ID from the database
export function getItemById(id: number): Promise<Item | undefined> {
  return new Promise((resolve, reject) => {
    const db = getDB();
    db.get('SELECT * FROM items WHERE id = ?', [id], (err: Error | null, row: Item) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

// Update an existing item in the database
export function updateItem(id: number, name: string, description: string): Promise<{ changes: number }> {
  return new Promise((resolve, reject) => {
    const db = getDB();
    db.run(
      'UPDATE items SET name = ?, description = ? WHERE id = ?',
      [name, description, id],
      function (this: sqlite3.RunResult, err: Error | null) {
        if (err) return reject(err);
        resolve({ changes: this.changes });
      }
    );
  });
}

// Delete an item from the database
export function deleteItem(id: number): Promise<{ changes: number }> {
  return new Promise((resolve, reject) => {
    const db = getDB();
    db.run('DELETE FROM items WHERE id = ?', [id], function (this: sqlite3.RunResult, err: Error | null) {
      if (err) return reject(err);
      resolve({ changes: this.changes });
    });
  });
}
