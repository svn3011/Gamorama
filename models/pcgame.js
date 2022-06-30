var mongoose = require("mongoose");


var pcgameSchema = new mongoose.Schema({
    url: String,
    img: String,
    nam: String,
    des: String
})

var PCGame = mongoose.model("PCGame", pcgameSchema);

module.exports = PCGame;