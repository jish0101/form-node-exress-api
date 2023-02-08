const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.header.authorization || req.header.Authorization;
    if (!authHeader?.startsWith("Bearer ")) return
    res.sendStatus(401);
    const token = authHeader.split(" ")[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403);

        req.user = decoded.UserInfo.username
        req.roles = decoded.UserInfo.roles
        next();
    })
}

module.exports = verifyJWT;