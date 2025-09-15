// backend/database.js
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database("./users.db", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error('Error when creating the database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        // SQL statement to create the users table with id, name, and email
        const createTableSql = `
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE
            )`;
        db.run(createTableSql, (err) => {
            if (err) {
                console.error('Error creating table.', err.message);
            }
        });
    }
});

module.exports = db;
