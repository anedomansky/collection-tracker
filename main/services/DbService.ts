import sqlite3 from 'sqlite3';
import { dbFilename } from '../db';
import { IDbService } from '../interfaces/IDbService';
import { IEntryRequest } from '../interfaces/IEntryRequest';
import { Item } from '../types/Item';

class DbService implements IDbService {
    private static instance: DbService;

    public static getInstance(): DbService {
        if (!DbService.instance) {
            DbService.instance = new DbService();
        }

        return DbService.instance;
    }

    public addEntry(request: IEntryRequest): void {
        const db = new sqlite3.Database(dbFilename, sqlite3.OPEN_READWRITE);
        const values: unknown = Object.values(request.entry);
        let sql: sqlite3.Statement;
        if (request.type === 'books') {
            sql = db.prepare('INSERT INTO books(id, author_name, cover_i, title, first_publish_year) VALUES(NULL, ?, ?, ?, ?)');
        }
        if (request.type === 'games') {
            sql = db.prepare('INSERT INTO games(id, name, background_image, released, rating, rating_top) VALUES(NULL, ?, ?, ?, ?, ?)');
        }
        if (request.type === 'shows') {
            sql = db.prepare('INSERT INTO shows(id, name, premiered, officialSite, status, summary, image_medium, image_original) VALUES(NULL, ?, ?, ?, ?, ?, ?, ?)');
        }
        sql.run(values);
        sql.finalize();
        db.close();
    }

    public getEntries(type: string): Item[] {
        const db = new sqlite3.Database(dbFilename, sqlite3.OPEN_READONLY);
        const sql = 'SELECT * from ?';
        let items: Item[];
        db.all(sql, type, (error, rows: Item[]) => {
            console.table(rows);
            items = rows;
        })
        db.close();
        return items;
    }

    public removeEntry(request: IEntryRequest): void {
        const db = new sqlite3.Database(dbFilename, sqlite3.OPEN_READWRITE);
        const sql = db.prepare('DELETE from ? WHERE id = ?');

    }
}

export default DbService;
