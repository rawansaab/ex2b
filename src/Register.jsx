/**
* Names: Rawan Saab (213693625), Lareen Kadour (213992431), George Hanna (324090968)
* Date: August 2026
* Description:
* React component for the user registration screen.
*/

import { useState } from "react";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        setMessage("");

        fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setMessage(
                        "Registration successful. You can now login."
                    );
                    setUsername("");
                    setPassword("");
                } else {
                    setMessage(data.error || "Could not register user");
                }
            })
            .catch(() => {
                setMessage("Could not connect to the server");
            });
    }

    return (
        <section>
            <h2>Register</h2>

            <form onSubmit={handleSubmit}>
                <label htmlFor="registerUsername">Username</label>
                <input
                    type="text"
                    id="registerUsername"
                    name="username"
                    autoComplete="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    required
                />

                <label htmlFor="registerPassword">Password</label>
                <input
                    type="password"
                    id="registerPassword"
                    name="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                />

                <button type="submit">Register</button>
            </form>

            {message && <p>{message}</p>}
        </section>
    );
}

export default Register;