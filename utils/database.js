const mongoDB = require("mongodb");

const client = mongoDB.MongoClient;

require("dotenv").config();

let db;

const mongoDbConnector = () => {
    client
        .connect(process.env.MONGODB_URL)
        .then((result) => {
            console.log("Connected");
            db = result.db();
        })
        .catch((err) => console.log(err));
};

const getDB = () => {
    if (db) {
        return db;
    }
    throw "No Database";
};
module.exports = { mongoDbConnector, getDB };
