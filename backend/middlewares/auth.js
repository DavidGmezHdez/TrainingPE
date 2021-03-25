const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) =>{
    let token = req.get("Authorization");
    jwt.verify(token,"secret",(err,decoded) =>{
        if(err){
            return res.status(401).json({
                ok: false,
                err:"Token no validp"
            });
        }

        req.user = decoded.user;
        next();
    })
};

    module.exports = {verifyToken};