const Post = require("../models/post");

exports.createPost = (req, res) => {
    const { title, photo, description } = req.body;
    Post.create({ title, description, imgUrl: photo, userId: req.user._id })
        .then((result) => res.redirect("/"))
        .catch((err) => console.log(err));
};

exports.renderCreatePost = (req, res) => {
    res.render("addpost");
};

exports.getPosts = (req, res) => {
    Post.find({}, "title")
        .populate("userId", "username")
        .then((posts) => res.render("home", { postArr: posts }))
        .catch((err) => console.log(err));
};

exports.postDetails = (req, res) => {
    const postId = req.params.id;
    Post.findById(postId)
        .then((post) => res.render("details", { post }))
        .catch();
};

exports.deletePost = (req, res) => {
    const id = req.params.postId;
    Post.findByIdAndDelete(id)
        .then((post) => res.redirect("/"))
        .catch((err) => console.log(err));
};

exports.editPostPage = (req, res) => {
    const id = req.params.postId;
    Post.findById(id)
        .then((post) => res.render("editpost", { post }))
        .catch((err) => console.log(err));
};

exports.editPost = (req, res) => {
    const { id, title, photo, description } = req.body;
    Post.findByIdAndUpdate(id, { title, description, imgUrl: photo })
        .then((result) => res.redirect("/"))
        .catch((err) => console.log(err));
};
