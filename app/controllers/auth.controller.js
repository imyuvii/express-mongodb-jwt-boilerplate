const db = require("../models");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const config = require("../config/config.js");
const Users = db.users;

/**
 * Retrieve all Tutorials from the database.
 * @param req
 * @param res
 */
exports.login = (req, res) => {
    const {email, password, device_token} = req.body;
    Users.findOne({email: email})
        .then(data => {
            if(data) {
                const accessToken = jwt.sign({
                    id: data.id,
                    name: data.name,
                    email: data.email,
                    role: data.role,
                    organization_phone: data.organization_phone,
                    display_picture: data.display_picture,
                    device_token: data.device_token,
                }, config.accessTokenSecret)
                data.last_log_in = new Date();
                data.user_token = accessToken;
                data.device_token = device_token;
                data.save();
                res.send({
                    result: true,
                    data: data
                })
            } else {
                res.send({
                    result: false,
                    message: "Invalid username / password"
                })
            }
            /*var hash = data.password;
            var bcrypt = require('bcrypt');
            hash = hash.replace(/^\$2y(.+)$/i, '$2a$1');
            bcrypt.compare("secret", hash, function (err, res) {
                console.log("Compared");
                console.log(res);
            });*/
        })
        .catch(err => {
            res.status(500).send({
                result: false,
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

/**
 * Returns the authenticated user
 * @param req
 * @param res
 * @returns {*}
 */
exports.me = (req, res) => {
    var authorization = req.headers.authorization.split(' ')[1], user;
    try {
        user = jwt.verify(authorization, config.accessTokenSecret);
        Users.findOne({email: user.email}).select("-password").then(data => {
            return res.status(200).json({
                result: true,
                data: data
            });
        });
    } catch (err) {
        return res.status(401).send({
            result: false,
            error: {
                message: "unauthorized",
                status_code: 401
            }
        });
    }
};

/**
 * Create New User
 * @param req
 * @param res
 * @returns {*}
 */
exports.signup = (req, res) => {
    const body = req.body;
    if (!(body.email && body.password)) {
        return res.status(400).send({ error: "Email and password are required fields" });
    }
    const user = new Users(body);
    user.password = bcrypt.hashSync(body.password, 10);
    user.save().then((doc) => res.status(201).send({
        result: true,
        data: doc
    })).catch(err => {
        res.status(500).json({
            result: false,
            error: {
                message: err.message,
                status_code: 500
            }
        });
    })
};
