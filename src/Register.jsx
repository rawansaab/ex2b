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

    function handleSubmit(event) {
        event.preventDefault();
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
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    required
                />

                <label htmlFor="registerPassword">Password</label>
                <input
                    type="password"
                    id="registerPassword"
                    name="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                />

                <button type="submit">Register</button>
            </form>
        </section>
    );
}

export default Register;