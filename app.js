const express = require("express");
const path = require("path");
const { mongoDbConnector } = require("./utils/database");
var bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const postRoute = require("./routes/post");
const adminRoute = require("./routes/admin");
const Post = require("./models/post");
const User = require("./models/user");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(postRoute);
app.use("/admin", adminRoute);

mongoDbConnector();
app.listen(8080);
