/**
* Names: Rawan Saab (213693625), Lareen Kadour (213992431), George Hanna (324090968)
* Date: August 2026
* Github URL: https://github.com/rawansaab/ex2b
* Description:
* Main server file for Exercise 2B.
* The server handles user login, registration,
* personal task data and communication with the database.
*
* Imported modules:
* express - creates the web server.
* express-session - manages user sessions.
* database - provides access to the SQLite database.
*/

const express = require("express");
const session = require("express-session");
const db = require("./database");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(session({
    secret: "my-tasks-secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 10
    }
}));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});