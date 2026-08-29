<!--
* Names: Rawan Saab (213693625), Lareen Kadour (213992431), George Hanna (324090968)
* Date: August 2026
* Description:
* Documentation for the Exercise 2B My Tasks application.
-->
## Important Note

This exercise was completed approximately two months ago.
Due to a computer failure and repair, the local project files and Git history were lost. We therefore had to restore the project and
upload it again to GitHub only a few days ago.

The recent GitHub upload dates do not reflect the original date on which the exercise was completed.

# Exercise 2B - My Tasks

My Tasks is a web application for managing personal tasks.

Each user can register, log in and manage a private task list.

## Main Features

- User registration
- User login and logout
- Personal user sessions
- Add new tasks
- Mark tasks as completed or active
- Delete tasks
- Store users and tasks in SQLite
- Separate task data for each user
- Responsive design for desktop and mobile

## Technologies

- Node.js
- Express
- Express Session
- SQLite
- React
- Vite
- JavaScript
- HTML
- CSS
- Fetch API
- JSON

## Installation

Install the project dependencies:

```bash
npm install
```

## Run the Application

Start the complete application:

```bash
npm start
```

The React application is built and served by the Node.js server.

Open the application in the browser:

```text
http://localhost:3000
```

## Development

To run the React development server:

```bash
npm run dev
```

The development server forwards API requests to the Node.js server
running on port 3000.

## Security

Task requests are protected by the authenticated user session.

The server uses the logged-in user's ID when reading, creating,
updating and deleting tasks.

Users cannot access another user's task data through the API.

Passwords are stored as hashes instead of plain text.

The SQLite database and server source files are not exposed as
public static files.

## Repository

GitHub repository:

https://github.com/rawansaab/ex2b

## AI Use

ChatGPT was used for assistance during development.