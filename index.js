const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const port = 8080;

const User = require('./models/User');
const projectController = require('./projects/projectController');
const { where } = require('sequelize');

const jwtSecret = "asd84as5das46541@Jbi3h4I#$$";

app.use(express.json());
app.use('/', projectController);
app.use(cors());

app.post('/user', async(req, res)=>{
    const {name, email, password} = req.body;
    if(name!='' && email!='' && password!=''){
        try{
            const u= await User.findOne({
                where:{
                    email:email
                }
            })
            if(u==null){
                const salt = bcrypt.genSaltSync(11);
                const hash = bcrypt.hashSync(password, salt);
                await User.create({
                        name,
                        email,
                        password:hash
                }).
                    res.status(401);
            } else {
                res.redirect('/user');
            } 
        } catch(err){
            res.json(err);
        }
    }
});

app.post('/auth', async(req, res)=>{
    const {email, password} = req.body;
    try{
        const user = await User.findOne({where:{email:email}});
        if(user!=null){
            const verification = bcrypt.compareSync(password, user.password);
            if(verification){
                jwt.sign({id:user.id,email:user.email,name:user.name}, jwtSecret, {expiresIn:'24h'}, (err, token)=>{
                    if(err){
                        res.status(400).json({err:"Erro, tente novamente"});
                    }
                    res.status(200).json({token, user});
                });
            } else {
                res.status(400).json({err:"Senha incorreta"});
            }
        } else {
            res.status(404).json({error: "Usuário não encontrado"});
        }
    } catch(err){
        console.log(err);
    }
    
});

app.listen(port,()=>{
    console.log(`Servidor rodando em http://localhost:${port}`);
})