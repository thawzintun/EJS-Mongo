const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
var bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const postRoute = require("./routes/post");
const adminRoute = require("./routes/admin");
const authRoute = require("./routes/auth");
const User = require("./models/user");
dotenv = require("dotenv").config();

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    User.findById("653020a2da6e3155a9796730").then((user) => {
        req.user = user;
        next();
    });
});

app.use(postRoute);
app.use("/admin", adminRoute);
app.use(authRoute);

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
