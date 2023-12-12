exports.getLoginPage = (req, res) => {
    res.render("auth/login");
};

exports.createLoginData = (req, res) => {
    res.setHeader("Set-Cookie", "isLogin=true");
    res.redirect("/");
};
