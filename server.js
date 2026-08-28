/**
* Names: Rawan Saab (213693625), Lareen Kadour (213992431),
* George Hanna (324090968)
* Date: August 2026
* Github URL: https://github.com/rawansaab/ex2b
* Description:
* Main server file for Exercise 2B.
* The server will handle user login, registration,
* personal task data and communication with the database.
*
* Imported modules:
* express - creates the web server.
*/

const express = require("express");

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});