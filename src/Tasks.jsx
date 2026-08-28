/**
* Names: Rawan Saab (213693625), Lareen Kadour (213992431), George Hanna (324090968)
* Date: August 2026
* Description:
* React component for displaying and managing the user's personal tasks.
*/

import { useEffect, useState } from "react";

function Tasks({ onLogout, onSessionExpired }) {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [message, setMessage] = useState("");

    function readResponse(response) {
        if (response.status === 401) {
            onSessionExpired();
            return null;
        }

        return response.json();
    }

    function loadTasks() {
        fetch("/api/tasks")
            .then(readResponse)
            .then((data) => {
                if (data === null) {
                    return;
                }

                if (Array.isArray(data)) {
                    setTasks(data);
                    setMessage("");
                } else {
                    setMessage(data.error || "Could not load tasks");
                }
            })
            .catch(() => {
                setMessage("Could not connect to the server");
            });
    }

    function handleSubmit(event) {
        event.preventDefault();
        setMessage("");

        fetch("/api/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: newTask
            })
        })
            .then(readResponse)
            .then((data) => {
                if (data === null) {
                    return;
                }

                if (data.error) {
                    setMessage(data.error);
                    return;
                }

                setNewTask("");
                loadTasks();
            })
            .catch(() => {
                setMessage("Could not add task");
            });
    }

    function toggleTask(taskId) {
        setMessage("");

        fetch(`/api/tasks/${taskId}/toggle`, {
            method: "POST"
        })
            .then(readResponse)
            .then((data) => {
                if (data === null) {
                    return;
                }

                if (data.error) {
                    setMessage(data.error);
                    return;
                }

                loadTasks();
            })
            .catch(() => {
                setMessage("Could not update task");
            });
    }

    function deleteTask(taskId) {
        setMessage("");

        fetch(`/api/tasks/${taskId}`, {
            method: "DELETE"
        })
            .then(readResponse)
            .then((data) => {
                if (data === null) {
                    return;
                }

                if (data.error) {
                    setMessage(data.error);
                    return;
                }

                loadTasks();
            })
            .catch(() => {
                setMessage("Could not delete task");
            });
    }

    useEffect(() => {
        loadTasks();
    }, []);

    return (
        <section>
            <h2>My Tasks</h2>

            <button type="button" onClick={onLogout}>
                Logout
            </button>

            <form onSubmit={handleSubmit}>
                <label htmlFor="newTask">New Task</label>
                <input
                    type="text"
                    id="newTask"
                    name="newTask"
                    value={newTask}
                    onChange={(event) => setNewTask(event.target.value)}
                    required
                />

                <button type="submit">Add Task</button>
            </form>

            {message && <p>{message}</p>}

            {tasks.length === 0 ? (
                <p>No tasks yet.</p>
            ) : (
                <ul>
                    {tasks.map((task) => (
                        <li
                            key={task.id}
                            className={task.completed
                                ? "completed-task"
                                : ""}
                        >
                            <span>{task.title}</span>

                            <button
                                type="button"
                                onClick={() => toggleTask(task.id)}
                            >
                                {task.completed
                                    ? "Mark Active"
                                    : "Mark Complete"}
                            </button>

                            <button
                                type="button"
                                onClick={() => deleteTask(task.id)}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

export default Tasks;