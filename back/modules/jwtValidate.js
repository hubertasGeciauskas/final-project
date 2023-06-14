const jwt = require("jsonwebtoken");
require(`dotenv`).config()

module.exports = (req, res, next) => {
    const token = req.headers['authorization']


    if (!token) return res.send({error: true, message: "no auth token"})

    jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
        if (err) return res.send({error: true, message: "auth error"})

        req.body.user = user
        return next()

    })
}