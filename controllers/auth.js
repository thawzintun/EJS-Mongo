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
    const message = req.flash("wrongCredentials")[0];
    const emailMessage = req.flash("requiredEmail")[0];
    const passwordMessage = req.flash("requiredPassword")[0];
    console.log(message);
    res.render("auth/login", {
        message,
        emailMessage,
        passwordMessage,
    });
};

exports.createLoginData = (req, res) => {
    const { email, password } = req.body;
    if (!email && !password) {
        req.flash("requiredEmail", "Email is required!");
        req.flash("requiredPassword", "Password is required!");
        return res.redirect("/login");
    }
    if (!email) {
        req.flash("requiredEmail", "Email is required!");
        return res.redirect("/login");
    }
    if (!password) {
        req.flash("requiredPassword", "Password is required!");
        return res.redirect("/login");
    }
    const userdData = User.findOne({ email: email })
        .then((user) => {
            req.flash(
                "wrongCredentials",
                "Please check your email or password and try again!"
            );
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
