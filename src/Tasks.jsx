/**
* Names: Rawan Saab (213693625), Lareen Kadour (213992431), George Hanna (324090968)
* Date: August 2026
* Description:
* React component for displaying the user's personal tasks.
*/

import { useState } from "react";

function Tasks() {
    const [tasks, setTasks] = useState([]);

    return (
        <section>
            <h2>My Tasks</h2>

            {tasks.length === 0 && <p>No tasks yet.</p>}
        </section>
    );
}

export default Tasks;