/**
* Names: Rawan Saab (213693625), Lareen Kadour (213992431), George Hanna (324090968)
* Date: August 2026
* Description:
* Provides a helper function for hashing user passwords.
*
* Imported modules:
* crypto - Node.js built-in module used to create a password hash.
*/

const crypto = require("crypto");

function hashPassword(password) {
    return crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");
}

module.exports = hashPassword;