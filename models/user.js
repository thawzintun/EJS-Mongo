const { Schema, model } = require("mongoose");

const userScheme = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minLength: 3,
        maxLength: 6,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 4,
    },
});

module.exports = model("User", userScheme);
