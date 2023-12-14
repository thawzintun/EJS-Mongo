//Package
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
var bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const session = require("express-session");
const mongoStore = require("connect-mongodb-session")(session);

//Server
const app = express();
const store = new mongoStore({
    uri: process.env.MONGODB_URI,
    databaseName: "blog",
});

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

app.use((req, res, next) => {
    User.findById("653020a2da6e3155a9796730").then((user) => {
        req.user = user;
        next();
    });
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
        User.findOne().then((user) => {
            return (
                !user &&
                User.create({
                    username: "admin",
                    email: "admin@gmail.com",
                    password: "abcdefg",
                })
            );
        });
    })
    .catch((err) => console.log(err));
