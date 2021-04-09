const jwt = require('jsonwebtoken');               //Importing the NPM bcrypt package.
require('dotenv').config();


// authentication
const authenticateToken = (req, res, next) => {
    // Gather the jwt access token from the request header
    const token = req.headers.authorization.split(' ')[1]
    if (token == null) return res.sendStatus(401) // if there isn't any token

    jwt.verify(JSON.parse(token), process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).send({ success: false, message: "Authorization failed" })

        next() // pass the execution off to whatever request the client intended
    })
}

module.exports = authenticateToken;