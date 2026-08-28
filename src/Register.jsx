/**
* Names: Rawan Saab (213693625), Lareen Kadour (213992431), George Hanna (324090968)
* Date: August 2026
* Description:
* React component for the user registration screen.
*/

function Register() {
    return (
        <section>
            <h2>Register</h2>

            <form>
                <label htmlFor="registerUsername">Username</label>
                <input
                    type="text"
                    id="registerUsername"
                    name="username"
                    required
                />

                <label htmlFor="registerPassword">Password</label>
                <input
                    type="password"
                    id="registerPassword"
                    name="password"
                    required
                />

                <button type="submit">Register</button>
            </form>
        </section>
    );
}

export default Register;