const router = require('express').Router();
const bcrypt = require("bcrypt");
let User = require('../models/users.model');
const jwt = require('jsonwebtoken');

router.route('/').get((req,res) =>{
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/register').post((req,res) =>{
    const username = req.body.username;
    const password = bcrypt.hashSync(req.body.password,10);
    const rango = req.body.rol;
    
    const newUser = new User({username,password,rango});

    console.log(newUser);
    User.findOne({username:req.body.username})
    .then((user)=>{
        if(user){
            return res.status(400).send({ok:false,message:"Usuario no encontrado"})
        }
        newUser.save()
        .then(() => res.status(200).send({message:'User added'}))
        .catch(err => res.status(400).send({message:'Error: ' + err}));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/login').post((req,res)=>{
    User.findOne({username:req.body.username})
    .then((user)=>{
        console.log(user);
        if(!user){
            
        }

        bcrypt.compareSync(req.body.password,user.password,function(err,res){
            if(err){
                return res.status(400).send({ok:false,message:"Clave incorrecta"})
            }
        });

        let token = jwt.sign({
            user: user
        },'secret',{expiresIn:'24'});

        res.status(200).json({ok:true,user:user,token});
    })
    .catch(err => res.status(400).json('Error: ' + err));
})



module.exports = router