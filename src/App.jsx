/**
* Names: Rawan Saab (213693625), Lareen Kadour (213992431), George Hanna (324090968)
* Date: August 2026
* Description:
* Main React component for the My Tasks application.
*/

import { useEffect, useState } from "react";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import Tasks from "./Tasks.jsx";

function App() {
    const [showRegister, setShowRegister] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);

    function changeScreen() {
        setShowRegister(!showRegister);
    }

    function checkSession() {
        fetch("/api/session")
            .then((response) => response.json())
            .then((data) => {
                setAuthenticated(data.authenticated);
            });
    }

    useEffect(() => {
        checkSession();
    }, []);

    return (
        <main>
            <h1>My Tasks</h1>

            {authenticated ? (
                <Tasks />
            ) : (
                <>
                    {showRegister ? <Register /> : <Login />}

                    <button type="button" onClick={changeScreen}>
                        {showRegister
                            ? "Already have an account? Login"
                            : "New user? Register"}
                    </button>
                </>
            )}
        </main>
    );
}

export default App;