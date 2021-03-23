const router = require('express').Router();
let Event = require('../models/events.model');

router.route('/').get((req,res) =>{
    Event.find()
    .then(events => res.json(events))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req,res) =>{
    console.log(req.body);
    const title = req.body.title;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);
    
    const newEvent = new Event({title,description,duration,date});
    console.log(newEvent);

    newEvent.save()
    .then(() => res.json('Event added'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req,res) =>{
    Event.findById(req.params.id)
    .then(event => res.json(event))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req,res) =>{
    Event.findByIdAndDelete(req.params.id)
    .then(event => res.json(event))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req,res) =>{
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


module.exports = router;