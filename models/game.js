var mongoose = require("mongoose");


var gameSchema = new mongoose.Schema({
    url: String,
    img: String,
    nam: String,
    cat: String
})

var Game = mongoose.model("Game", gameSchema);

module.exports = Game;