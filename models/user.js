var mongoose = require("mongoose");
var passportLM = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    username: String,
    password: String
});
userSchema.plugin(passportLM);
var User = mongoose.model("User", userSchema);

module.exports = User;