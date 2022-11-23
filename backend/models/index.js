const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./administrador");
db.email = require("./email");
db.impressao3d = require ("./impressao3d")
db.file = require("./files");
module.exports = db;