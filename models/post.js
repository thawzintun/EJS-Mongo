const mongoDB = require("mongodb");
const { getDB } = require("../utils/database");

class Post {
    constructor(title, description, imgUrl, _id) {
        this.title = title;
        this.description = description;
        this.imgUrl = imgUrl;
        this._id = _id && (this._id = new mongoDB.ObjectId(_id));
    }
    create() {
        const db = getDB();
        let dbTmp;
        if (this._id) {
            dbTmp = db
                .collection("posts")
                .updateOne({ _id: this._id }, { $set: this });
        } else {
            dbTmp = db.collection("posts").insertOne(this);
        }
        return dbTmp
            .then((result) => {
                console.log(result);
            })
            .catch((err) => console.log(err));
    }
    static getPosts() {
        const db = getDB();
        return db
            .collection("posts")
            .find()
            .sort({ title: 1 })
            .toArray()
            .then((result) => {
                return result;
            })
            .catch((err) => console.log(err));
    }
    static getPost(postId) {
        const db = getDB();
        return db
            .collection("posts")
            .find({ _id: new mongoDB.ObjectId(postId) })
            .next()
            .then((result) => {
                return result;
            })
            .catch((err) => console.log(err));
    }
    static deletePost(id) {
        const db = getDB();
        return db
            .collection("posts")
            .deleteOne({ _id: new mongoDB.ObjectId(id) })
            .then((result) => {
                return result;
            })
            .catch((err) => console.log(err));
    }
}

module.exports = Post;
