const Post = require("../models/post");

exports.createPost = (req, res) => {
    const { title, photo, description } = req.body;
    const post = new Post(title, description, photo);
    post.create()
        .then((result) => res.redirect("/"))
        .catch((err) => console.log(err));
};

exports.renderCreatePost = (req, res) => {
    res.render("addpost");
};

exports.getPosts = (req, res) => {
    Post.getPosts()
        .then((posts) => res.render("home", { postArr: posts }))
        .catch((err) => console.log(err));
};

exports.postDetails = (req, res) => {
    const postId = req.params.id;
    Post.getPost(postId)
        .then((post) => res.render("details", { post }))
        .catch();
};

exports.deletePost = (req, res) => {
    const id = req.params.postId;
    Post.deletePost(id)
        .then((post) => res.redirect("/"))
        .catch((err) => console.log(err));
};

exports.editPostPage = (req, res) => {
    const id = req.params.postId;
    Post.getPost(id)
        .then((post) => res.render("editpost", { post }))
        .catch((err) => console.log(err));
};

exports.editPost = (req, res) => {
    const { id, title, photo, description } = req.body;
    const post = new Post(title, description, photo, id);
    post.create()
        .then((result) => res.redirect("/"))
        .catch((err) => console.log(err));
};
