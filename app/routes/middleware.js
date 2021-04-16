const config = require("../config/config.js");
const jwt = require("jsonwebtoken")
module.exports = {
    authenticateJWT: function (req, res, next) {
        const authHeader = req.headers.authorization;

        if (authHeader) {
            const token = authHeader.split(' ')[1];
            jwt.verify(token, config.accessTokenSecret, (err, user) => {
                if (err) {
                    res.status(403)
                    return res.json({
                        result: false,
                        error: {
                            message: "Token Signature could not be verified.",
                            status_code: 403
                        }
                    });
                }
                req.user = user;
                next();
            });
        } else {
            res.sendStatus(401);
        }
    }
}