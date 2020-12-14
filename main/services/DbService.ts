import sqlite3 from 'sqlite3';
import dbFilename from '../db';
import { EntryRequest } from '../interfaces/EntryRequest';
import { RemoveRequest } from '../interfaces/RemoveRequest';
import { CollectionItem } from '../types/CollectionItem';

class DbService {
    public static async addEntry(request: EntryRequest): Promise<void> {
        const db = new sqlite3.Database(dbFilename, sqlite3.OPEN_READWRITE);
        const values: unknown = Object.values(request.entry);
        let sql: sqlite3.Statement;
        return new Promise((resolve, reject) => {
            if (request.type === 'books') {
                sql = db.prepare('INSERT INTO books(id, author_name, cover_i, title, first_publish_year) VALUES(NULL, ?, ?, ?, ?)');
            } else if (request.type === 'games') {
                sql = db.prepare('INSERT INTO games(id, name, background_image, released, rating, rating_top) VALUES(NULL, ?, ?, ?, ?, ?)');
            } else if (request.type === 'shows') {
                sql = db.prepare('INSERT INTO shows(id, name, premiered, officialSite, status, summary, image_medium, image_original) VALUES(NULL, ?, ?, ?, ?, ?, ?, ?)');
            } else {
                reject(new Error('No valid request type!'));
            }
            sql.run(values);
            sql.finalize();
            db.close();
            resolve();
        });
    }

    public static async getEntries(category: string): Promise<CollectionItem[]> {
        const db = new sqlite3.Database(dbFilename, sqlite3.OPEN_READONLY);
        const sql = `SELECT * from ${category}`;
        let items: CollectionItem[] = [];
        return new Promise((resolve, reject) => {
            db.all(sql, (error, rows: CollectionItem[]) => {
                if (error) {
                    reject(error);
                }
                items = rows;
                resolve(items);
            });
            db.close();
        });
    }

    public static async removeEntry(request: RemoveRequest): Promise<void> {
        const db = new sqlite3.Database(dbFilename, sqlite3.OPEN_READWRITE);
        const values: unknown = Object.values(request);
        return new Promise((resolve, reject) => {
            const sql = db.prepare(`DELETE from ${request.type} WHERE id = ${request.id}`);
            sql.run(values);
            sql.finalize();
            db.close();
            resolve();
        });
    }
}

export default DbService;
