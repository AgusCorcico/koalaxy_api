const jwt = require('jsonwebtoken');

function verifyToken(req,res,next){
    const authHeader = req.headers.token;

    if(authHeader){
        const token = authHeader.split(" ")[1] //Separo el Bearer del token y tomo el valor del token([1])
        jwt.verify(token, process.env.SECRET_KEY_CRYPTO,(err,user)=>{
            if(err) {res.send('Token invalid')};
            req.user = user //estas son las credenciales id y isAdmin
            next();
        })
    }else{
        return res.send('You are not authenticated')
    }
}

module.exports = verifyToken;