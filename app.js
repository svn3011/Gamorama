var express     = require("express"),
    bodyParser  = require("body-parser"),
    app         = express(),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    localStrategy  = require("passport-local"),
    methodOverride = require("method-override"),
    expSan         = require("express-sanitizer");

var compression = require('compression');
app.use(compression());


mongoose.connect("mongodb+srv://mmaj6625:mmaj6625@cluster0-h9ef6.mongodb.net/test?retryWrites=true&w=majority", { useUnifiedTopology: true,useNewUrlParser: true }); //create GAMORAMA db inside mongodb


app.use(expSan());
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));



// ==========================
// ***** AUTH functions *****
// ==========================
var User = require("./models/user");

app.use(require("express-session")({
    secret: "Gaming Is Life",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})

// ==========================
// ***** AUTH Func Over *****
// ==========================

var category = [
    {
        url: "https://www.vippng.com/png/detail/9-95861_playing-cards-playing-card-icon-vector.png",
        name: "Cards"
    },

    {
        url: "https://pngimage.net/wp-content/uploads/2018/06/puzzle-icon-png-2.png",
        name: "Puzzle"
    },

    {
        url: "data:image/png;base64,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",
        name: "Quiz"
    },

    {
        url: "https://cdn.iconscout.com/icon/premium/png-256-thumb/arcade-6-209690.png",
        name: "Arcade"
    },

    {
        url: "https://cdn1.iconfinder.com/data/icons/car-racing-1/64/522_car-racing-vehicle-speed-512.png",
        name: "Racing"
    },

    {
        url: "https://icons-for-free.com/iconfiles/png/512/soccer+sport+icon-1320195352221279011.png",
        name: "Sport"
    },

    {
        url: "https://cdn3.iconfinder.com/data/icons/game-competition-glyph/64/03_PvP_Game_game_competition-512.png",
        name: "Multiplayer"
    },

    {
        url: "https://cdn1.iconfinder.com/data/icons/jump-jumping-poses-and-postures/232/man-jump-jumping-012-512.png",
        name: "JumpAndRun"
    }

];

// ==========================
//         ROUTES
// ==========================

var Game = require("./models/game");
var PCGame = require("./models/pcgame");
var middleware = require("./middleware/index")


app.get("/", function(req, res){

    Game.find({}, function(err, game){
        if(err){
            console.log(err);
        } else{
            res.render("Game/index.ejs", {games:game});
        }
    })
});

app.post("/",middleware.isLoggedIn, function(req,res){

    Game.create(req.body.game, function(err, newGame){
        newGame.save();
        if(err){
            res.render("/");
        } else {
            res.render("Game/new.ejs");
        }
    })
})

app.delete("/:id",middleware.isLoggedIn, function(req, res){
    Game.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/");
        } else{
            res.redirect("/");
        }
    })
})

app.get("/new",middleware.isLoggedIn, function(req, res){
    res.render("Game/new.ejs");
});

app.get("/category", function(req, res){
    res.render("Game/category.ejs", {cats:category});
});

category.forEach(function(cat){
    app.get("/"+cat.name, function(req, res){
        Game.find({}, function(err, game){
            if(err){
                console.log(err);
            } else{
                res.render("Game/games.ejs", {games:game, cat:cat});
            }
        })
    })
});

app.get("/about", function(req, res){
    res.render("Game/about.ejs");
});

app.get("/pcgames", function(req, res){
    PCGame.find({}, function(err, game){
        if(err){
            console.log(err);
        } else{
            res.render("PCGame/pcgames.ejs", {games:game});
        }
    })
});

app.get("/pcnew",middleware.isLoggedIn, function(req, res){
    res.render("PCGame/pcnew.ejs");
})

app.post("/pcgames",middleware.isLoggedIn, function(req, res){
    PCGame.create(req.body.game, function(err, newGame){
        newGame.save();
        if(err){
            res.redirect("/pcgames");
        } else {
            res.render("PCGame/pcnew.ejs");
        }
    })
});

app.delete("/pcgames/:id",middleware.isLoggedIn, function(req, res){
    PCGame.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/pcgames");
        } else{
            res.redirect("/pcgames");
        }
    });
})

app.get("/pcgames/:id", function(req, res){
    PCGame.findById(req.params.id, function(err, foundGame){
        if(err){
            res.redirect("/pcgames");
        } else {
            res.render("PCGame/show.ejs", {gdes: foundGame});
        }
    });
})

// ****** AUTH ROUTES ******



app.get("/signup6625", function(req, res){
    res.render("signup.ejs");
});

app.post("/signup6625", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            return res.render("signup.ejs");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/new");
            console.log("LOGGED IN");
        })
})
})

app.get("/login6625", function(req, res){
    res.render("login.ejs");
});

app.post("/login6625", passport.authenticate("local",
     {
         successRedirect: "/new",
         failureRedirect: "/login6625"
     }),function(req, res){

        console.log("LOGGED IN");

});

app.get("/logout", function(req,res){
    req.logout();
    res.redirect("/");
    console.log("LOGGED OUT");

});

// ******------------*******

// ==========================
//       ROUTES OVER
// ==========================


    








const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SERVER IS RUNNING..");
});