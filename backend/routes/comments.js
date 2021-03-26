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
    .then(() => res.json('Comment added'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req,res) =>{
    Comment.find({idevent:req.body.idevent})
    .then(comments => res.json(comments))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req,res) =>{
    Comment.findByIdAndDelete(req.params.id)
    .then(() => res.json('Comment Deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});

/*router.route('/update/:id').post((req,res) =>{
    Event.findById(req.params.id)
    .then(event => {
        event.title = req.body.title;
        event.description = req.body.description;
        event.duration = Number(req.body.duration);
        event.date = Date.parse(req.body.date);
        console.log(event);
        event.save()
        .then(() => res.json('Event Updated'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
*/


module.exports = router;