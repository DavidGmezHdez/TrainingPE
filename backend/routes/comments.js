const router = require('express').Router();
let Comment = require('../models/comment.model');
const {verifyToken} = require("../middlewares/auth");

router.route('/add').post((req,res) =>{
    console.log(req.body);
    const idevent = req.body.idevent;
    const author = req.body.author;
    const comment = req.body.comment;
    
    const newComment = new Comment({idevent,author,comment});
    console.log(newComment);

    newComment.save()
    .then(() => res.status(200).send({message:'Comment added', comment:newComment}))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').get((req,res) =>{
    Comment.find()
    .then(events => res.json(events))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:id').get((req,res) =>{
    Comment.find({idevent:req.params.id})
    .then((comments) => res.status(200).send({comments:comments}))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req,res) =>{
    Comment.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).send({message:'Comment deleted'}))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;