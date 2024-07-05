const jwt = require('jsonwebtoken');

const jwtSecret = "asd84as5das46541@Jbi3h4I#$$";

function authMid(req, res, next){
    const jwtoken = req.headers['authorization'];
    if(jwtoken!=null){
        const bearer = jwtoken.split(' ');
        const token = bearer[1];

        jwt.verify(token, jwtSecret, (err, data)=>{
            if(err){
                res.status(401).json(err);
            } else {
                req.token = token;
                req.loggedUser = {id: data.id, email: data.email, name:data.name};
                next();
            }
        });
    }else {
        res.status(401).json({err:'Token inválido'});
    }
}

module.exports = authMid;