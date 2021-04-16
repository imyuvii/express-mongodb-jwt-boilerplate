const config = require("../config/config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = config.url;
db.conversations = require("./conversations.model.js")(mongoose);
db.users = require("./users.model.js")(mongoose);

module.exports = db;
