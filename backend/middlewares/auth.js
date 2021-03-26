const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) =>{
    let token = req.get("x-access-token");
    jwt.verify(token,"secret")
    .then(()=>{
        req.user = decoded.user;
        next();
    })
    .catch((err)=>{
        console.log("Error verify token: "+err);
        return res.status(401).json({
            ok: false,
            err:"Token no valido"
        });
    })
};

module.exports = {verifyToken};