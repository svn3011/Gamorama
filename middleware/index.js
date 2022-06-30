var Game = require("./../models/game");

var middlewareObj = {};

middlewareObj.isLoggedIn = function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    redirect("/login6625");
}

module.exports = middlewareObj;