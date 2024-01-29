//Package
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
var bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const session = require("express-session");
const mongoStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");

//Server
const app = express();
const store = new mongoStore({
    uri: process.env.MONGODB_URI,
    databaseName: "blog",
});
const csrfProtection = csrf();

//Engine
app.set("view engine", "ejs");
app.set("views", "views");

//Route
const postRoute = require("./routes/post");
const adminRoute = require("./routes/admin");
const User = require("./models/user");
const authRoute = require("./routes/auth");

//Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    session({
        secret: process.env.SESSION_KEY,
        store,
        resave: false,
        saveUninitialized: false,
    })
);

app.use(csrfProtection);
app.use("/admin", (req, res, next) => {
    if (!req.session.isLogin) {
        return res.redirect("/login");
    }
    User.findById(req.session.userInfo._id)
        .select("_id email")
        .then((user) => {
            req.user = user;
            return next();
        });
});
app.use((req, res, next) => {
    res.locals.isLogin = req.session.isLogin;
    res.locals.csrfToken = req.csrfToken();
    next();
});

//Route Define Middleware
app.use(postRoute);
app.use("/admin", adminRoute);
app.use(authRoute);

//Database
mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        app.listen(8080);
    })
    .catch((err) => console.log(err));
