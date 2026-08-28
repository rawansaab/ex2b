/**
* Names: Rawan Saab (213693625), Lareen Kadour (213992431), George Hanna (324090968)
* Date: August 2026
* Description:
* Creates the SQLite database connection and users table.
*
* Imported modules:
* sqlite3 - provides access to the SQLite database.
*/

const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("tasks.db", (error) => {
    if (error) {
        console.error("Database connection error:", error.message);
        return;
    }

    console.log("Connected to the SQLite database");
});

db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )
`, (error) => {
    if (error) {
        console.error("Users table error:", error.message);
    }
});

module.exports = db;