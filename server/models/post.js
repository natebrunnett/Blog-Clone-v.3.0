const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    username: {type: String, required: true},
    dateFormatted: {type: Date, required: true},
    dateRaw: {type: Date, required: true},
    albumImage: {type: String, required: false},
    albumName: {type: String, required: false},
    artistName: {type: String, required: false},
    textBody: {type: String, required: true}
});

module.exports = mongoose.model("posts", postSchema);