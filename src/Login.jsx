/**
* Names: Rawan Saab (213693625), Lareen Kadour (213992431), George Hanna (324090968)
* Date: August 2026
* Description:
* React component for the user login screen.
*/

function Login() {
    return (
        <section>
            <h2>Login</h2>

            <form>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    required
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    required
                />

                <button type="submit">Login</button>
            </form>
        </section>
    );
}

export default Login;