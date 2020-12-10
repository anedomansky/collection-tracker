import sqlite3 from 'sqlite3';
import dbFilename from '../db';
import { EntryRequest } from '../interfaces/EntryRequest';
import { RemoveRequest } from '../interfaces/RemoveRequest';
import { CollectionItem } from '../types/CollectionItem';

class DbService {
    public static addEntry(request: EntryRequest): void {
        const db = new sqlite3.Database(dbFilename, sqlite3.OPEN_READWRITE);
        const values: unknown = Object.values(request.entry);
        let sql: sqlite3.Statement;
        if (request.type === 'books') {
            sql = db.prepare('INSERT INTO books(id, author_name, cover_i, title, first_publish_year) VALUES(NULL, ?, ?, ?, ?)');
        } else if (request.type === 'games') {
            sql = db.prepare('INSERT INTO games(id, name, background_image, released, rating, rating_top) VALUES(NULL, ?, ?, ?, ?, ?)');
        } else {
            sql = db.prepare('INSERT INTO shows(id, name, premiered, officialSite, status, summary, image_medium, image_original) VALUES(NULL, ?, ?, ?, ?, ?, ?, ?)');
        }
        sql.run(values);
        sql.finalize();
        db.close();
    }

    public static getEntries(category: string): CollectionItem[] {
        const db = new sqlite3.Database(dbFilename, sqlite3.OPEN_READONLY);
        const sql = 'SELECT * from ?';
        let items: CollectionItem[] = [];
        db.all(sql, category, (error, rows: CollectionItem[]) => {
            console.table(rows);
            items = rows;
        });
        db.close();
        return items;
    }

    public static removeEntry(request: RemoveRequest): void {
        const db = new sqlite3.Database(dbFilename, sqlite3.OPEN_READWRITE);
        const values: unknown = Object.values(request);
        const sql = db.prepare('DELETE from ? WHERE id = ?');
        sql.run(values);
        sql.finalize();
        db.close();
    }
}

export default DbService;
