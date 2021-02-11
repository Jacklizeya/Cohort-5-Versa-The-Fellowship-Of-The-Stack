const jwt = require("jsonwebtoken");
const pool = require("../db");

const optionalAuth = async (req, res, next) => {
    try {
        if (req.header("Authorization")) {
            const token = req.header("Authorization").replace("Bearer ", "");
            const decoded = jwt.verify(token, process.env.JWT); //gets user id, that gets saved into decoded.id
            const user = await pool.query(`SELECT * FROM users WHERE id = $1`, [
                decoded.id,
            ]);
            //const user = await User.findOne({ _id: decoded._id });
            if (!user.rows) {
                throw new Error("no user");
            }
            req.user = user.rows[0]; //attaches a user property onto the req, and that user is the obj that it got from the db
            delete req.user.password; //we dont want to pass the password on so we delete it from req.user object
        }
        next(); //next just means that we are done here so send it off to the endpoint function, so this fxn goes to the next router fxn
    } catch (e) {
        console.log(e);
        res.status(401).send({ error: "Please authenticate" });
    }
};

module.exports = optionalAuth;