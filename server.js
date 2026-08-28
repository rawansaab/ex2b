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
* path - works with application file paths.
* database - provides access to the SQLite database.
* password - provides the password hashing function.
*/

const express = require("express");
const session = require("express-session");
const path = require("path");
const db = require("./database");
const hashPassword = require("./password");

const app = express();
const PORT = 3000;
const distPath = path.join(__dirname, "dist");

app.use(express.json());
app.use(express.static(distPath));

app.use(session({
    secret: "my-tasks-secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 10
    }
}));

function requireAuthentication(req, res, next) {
    if (!req.session.isAuthenticated) {
        return res.status(401).json({
            error: "Authentication required"
        });
    }

    next();
}

app.post("/api/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !username.trim() || !password) {
        return res.status(400).json({
            error: "Username and password are required"
        });
    }

    const passwordHash = hashPassword(password);

    const sql = `
        INSERT INTO users (username, password)
        VALUES (?, ?)
    `;

    db.run(
        sql,
        [username.trim(), passwordHash],
        (error) => {
            if (error) {
                if (error.code === "SQLITE_CONSTRAINT") {
                    return res.status(409).json({
                        error: "Username already exists"
                    });
                }

                return res.status(500).json({
                    error: "Could not register user"
                });
            }

            return res.status(201).json({
                success: true
            });
        }
    );
});

app.post("/api/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !username.trim() || !password) {
        return res.status(400).json({
            error: "Username and password are required"
        });
    }

    const sql = `
        SELECT id, password
        FROM users
        WHERE username = ?
    `;

    db.get(sql, [username.trim()], (error, user) => {
        if (error) {
            return res.status(500).json({
                error: "Could not login"
            });
        }

        if (!user) {
            return res.status(401).json({
                error: "Invalid username or password"
            });
        }

        const passwordHash = hashPassword(password);

        if (passwordHash !== user.password) {
            return res.status(401).json({
                error: "Invalid username or password"
            });
        }

        req.session.isAuthenticated = true;
        req.session.userId = user.id;

        return res.json({
            success: true
        });
    });
});

app.get("/api/session", (req, res) => {
    if (req.session.isAuthenticated) {
        return res.json({
            authenticated: true
        });
    }

    return res.json({
        authenticated: false
    });
});

app.post("/api/logout", (req, res) => {
    req.session.destroy(() => {
        res.json({
            success: true
        });
    });
});

app.get("/api/tasks", requireAuthentication, (req, res) => {
    const sql = `
        SELECT id, title, completed
        FROM tasks
        WHERE user_id = ?
        ORDER BY id DESC
    `;

    db.all(sql, [req.session.userId], (error, rows) => {
        if (error) {
            return res.status(500).json({
                error: "Could not load tasks"
            });
        }

        return res.json(rows);
    });
});

app.post("/api/tasks", requireAuthentication, (req, res) => {
    const title = req.body.title;

    if (!title || !title.trim()) {
        return res.status(400).json({
            error: "Task title is required"
        });
    }

    const sql = `
        INSERT INTO tasks (user_id, title, completed)
        VALUES (?, ?, 0)
    `;

    db.run(
        sql,
        [req.session.userId, title.trim()],
        function (error) {
            if (error) {
                return res.status(500).json({
                    error: "Could not add task"
                });
            }

            return res.status(201).json({
                id: this.lastID,
                title: title.trim(),
                completed: 0
            });
        }
    );
});

app.post(
    "/api/tasks/:id/toggle",
    requireAuthentication,
    (req, res) => {
        const sql = `
            UPDATE tasks
            SET completed =
                CASE
                    WHEN completed = 0 THEN 1
                    ELSE 0
                END
            WHERE id = ? AND user_id = ?
        `;

        db.run(
            sql,
            [req.params.id, req.session.userId],
            function (error) {
                if (error) {
                    return res.status(500).json({
                        error: "Could not update task"
                    });
                }

                if (this.changes === 0) {
                    return res.status(404).json({
                        error: "Task not found"
                    });
                }

                return res.json({
                    success: true
                });
            }
        );
    }
);

app.delete(
    "/api/tasks/:id",
    requireAuthentication,
    (req, res) => {
        const sql = `
            DELETE FROM tasks
            WHERE id = ? AND user_id = ?
        `;

        db.run(
            sql,
            [req.params.id, req.session.userId],
            function (error) {
                if (error) {
                    return res.status(500).json({
                        error: "Could not delete task"
                    });
                }

                if (this.changes === 0) {
                    return res.status(404).json({
                        error: "Task not found"
                    });
                }

                return res.json({
                    success: true
                });
            }
        );
    }
);

app.get("/", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});