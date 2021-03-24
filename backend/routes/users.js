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
    const rango = req.body.rango;
    
    const newUser = new User({username,password,rango});
    newUser.save()
    .then(() => res.status(200).send({message:'User added'}))
    .catch(err => res.status(400).send({message:'Error: ' + err}));
    
});

/*router.route('/login').post((req,res)=>{
    User.findOne({user:req.body.username},(err,user=>{
        if(!user)
            return res.status(400).send({ok:false,err:{message:"Usuario no encontrado"}})
        
        if(!bcrypt.compareSync(req.body.password,user.password))
            return res.status(400).send({ok:false,err:{message:"Clave incorrecta"}})
        
        let token = jwt.sign({
            userbd: user
        },'secret',{expiresIn:'24'})

        res.json({ok:true,userbd:user,token});
    }));
})
*/
router.route('/login').post((req,res)=>{
    User.findOne({user:req.body.username},(err,user=>{
        if(!user)
            return res.status(400).send({ok:false,err:{message:"Usuario no encontrado"}})
        
        if(!bcrypt.compareSync(req.body.password,user.password))
            return res.status(400).send({ok:false,err:{message:"Clave incorrecta"}})
        
        let token = jwt.sign({
            userbd: user
        },'secret',{expiresIn:'24'})

        res.json({ok:true,userbd:user,token});
    }));
})



module.exports = router