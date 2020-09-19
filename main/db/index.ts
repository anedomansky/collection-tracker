import sqlite3 from 'sqlite3';
import Colors from '../config/Colors';

sqlite3.verbose();

const dbFilename = '../db.sqlite3';

const db = new sqlite3.Database(dbFilename, (error): void => {
    if (error) {
        console.trace(Colors.fgRed, '> Could not connect to database.', error, Colors.fgReset);
    } else {
        console.log(Colors.fgGreen, '> Connected to database.', Colors.fgReset);
    }
});

db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT, amount REAL, category TEXT, date TEXT, CONSTRAINT fk_category FOREIGN KEY (category) REFERENCES category (name) ON DELETE CASCADE)',
        (error): void => {
            if (error) {
                console.trace(Colors.fgRed, '> Could not create the table.', error, Colors.fgReset);
            } else {
                console.log(Colors.fgGreen, '> Created the table.', Colors.fgReset);
            }
        });
    db.run('CREATE TABLE IF NOT EXISTS games (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE)',
        (error): void => {
            if (error) {
                console.trace(Colors.fgRed, '> Could not create the table.', error, Colors.fgReset);
            } else {
                console.log(Colors.fgGreen, '> Created the table.', Colors.fgReset);
            }
        });
    db.run('CREATE TABLE IF NOT EXISTS shows (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE)',
        (error): void => {
            if (error) {
                console.trace(Colors.fgRed, '> Could not create the table.', error, Colors.fgReset);
            } else {
                console.log(Colors.fgGreen, '> Created the table.', Colors.fgReset);
            }
        });
    db.close((error): void => {
        if (error) {
            console.trace(Colors.fgRed, '> Could not disconnect from the database.', error, Colors.fgReset);
        } else {
            console.log(Colors.fgGreen, '> Disconnected from the database.', Colors.fgReset);
        }
    });
});
