/**
* Names: Rawan Saab (213693625), Lareen Kadour (213992431), George Hanna (324090968)
* Date: August 2026
* Description:
* Creates the SQLite database connection for the My Tasks application.
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

module.exports = db;