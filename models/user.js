const { Schema, model } = require("mongoose");

const userScheme = new Schema({
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
