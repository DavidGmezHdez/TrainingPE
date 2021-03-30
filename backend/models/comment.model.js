const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    idevent:{type: String, required:true},
    author: {type: String, required:true},
    comment: {type: String, required:true},
},{
    timestamps: true,
});

const Comment = mongoose.model('Comment',commentSchema);

module.exports = Comment;