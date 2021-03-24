const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) =>{
    const token = req.get("Authorization");

    jwt.verify(token,'secret',(decoded,err) =>{
        if(err)
            return res.status(400).send({ok:false,err:err});

        req.userbd = decoded.userbd;

        next();
    });
};

module.exports = {verifyToken};