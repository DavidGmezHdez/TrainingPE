const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    idcomment: {type: String, required:true},
    idevent:{type: String, required:true},
    author: {type: String, required:true},
    comment: {type: Number, required:true},
},{
    timestamps: true,
});

const Comment = mongoose.model('Comment',commentSchema);

module.exports = Comment;