const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.getSignUpPage = (req, res) => {
    res.render("auth/register");
};

exports.createNewAccount = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email })
        .then((data) => {
            if (!data) {
                return bcrypt.hash(password, saltRounds).then((hash) => {
                    User.create({
                        email,
                        password: hash,
                    });
                });
            }
            return res.redirect("/signup");
        })
        .then(() => res.redirect("/login"))
        .catch((err) => console.log(err));
};

exports.getLoginPage = (req, res) => {
    res.render("auth/login");
};

exports.createLoginData = (req, res) => {
    const { email, password } = req.body;
    const userdData = User.findOne({ email: email })
        .then((user) => {
            if (user) {
                return bcrypt
                    .compare(password, user.password)
                    .then((isMatch) => {
                        if (isMatch) {
                            req.session.isLogin = true;
                            req.session.userInfo = user;
                            return req.session.save((err) => {
                                res.redirect("/");
                            });
                        }
                        return res.redirect("/login");
                    });
            }
            return res.redirect("/login");
        })
        .catch((err) => console.log(err));
};

exports.logout = (req, res) => {
    req.session.destroy(() => res.redirect("/"));
};
