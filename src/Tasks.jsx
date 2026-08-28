/**
* Names: Rawan Saab (213693625), Lareen Kadour (213992431), George Hanna (324090968)
* Date: August 2026
* Description:
* React component for displaying and managing the user's personal tasks.
*/

import { useEffect, useState } from "react";

function Tasks({ onLogout }) {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    function loadTasks() {
        fetch("/api/tasks")
            .then((response) => response.json())
            .then((data) => {
                setTasks(data);
            });
    }

    function handleSubmit(event) {
        event.preventDefault();

        fetch("/api/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: newTask
            })
        })
            .then((response) => response.json())
            .then((task) => {
                setTasks([task, ...tasks]);
                setNewTask("");
            });
    }

    function toggleTask(taskId) {
        fetch(`/api/tasks/${taskId}/toggle`, {
            method: "POST"
        })
            .then((response) => response.json())
            .then(() => {
                loadTasks();
            });
    }

    function deleteTask(taskId) {
        fetch(`/api/tasks/${taskId}`, {
            method: "DELETE"
        })
            .then((response) => response.json())
            .then(() => {
                loadTasks();
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

            {tasks.length === 0 ? (
                <p>No tasks yet.</p>
            ) : (
                <ul>
                    {tasks.map((task) => (
                        <li key={task.id}>
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