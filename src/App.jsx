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
    const [checkingSession, setCheckingSession] = useState(true);

    function changeScreen() {
        setShowRegister(!showRegister);
    }

    function checkSession() {
        fetch("/api/session")
            .then((response) => response.json())
            .then((data) => {
                setAuthenticated(data.authenticated === true);
                setCheckingSession(false);
            })
            .catch(() => {
                setAuthenticated(false);
                setCheckingSession(false);
            });
    }

    function handleLogin() {
        setAuthenticated(true);
        setShowRegister(false);
    }

    function handleSessionExpired() {
        setAuthenticated(false);
        setShowRegister(false);
    }

    function handleLogout() {
        fetch("/api/logout", {
            method: "POST"
        })
            .then((response) => response.json())
            .then(() => {
                handleSessionExpired();
            })
            .catch(() => {
                handleSessionExpired();
            });
    }

    useEffect(() => {
        checkSession();
    }, []);

    return (
        <main>
            <h1>My Tasks</h1>

            {checkingSession ? (
                <section>
                    <p>Checking session...</p>
                </section>
            ) : authenticated ? (
                <Tasks
                    onLogout={handleLogout}
                    onSessionExpired={handleSessionExpired}
                />
            ) : (
                <>
                    {showRegister ? (
                        <Register />
                    ) : (
                        <Login onLogin={handleLogin} />
                    )}

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