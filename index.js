const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const port = 8080;

const Project = require('./models/Project');
const User = require('./models/User');
const Task = require('./models/Task');
const projectController = require('./projects/projectController');
const { where } = require('sequelize');
const authMid = require('./middlewares/authMid');

const jwtSecret = "asd84as5das46541@Jbi3h4I#$$";

app.use(express.json());
app.use('/', projectController);

app.post('/user', async(req, res)=>{
    const {name, email, password} = req.body;
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
                res.redirect('/');
        } else {
            res.redirect('/user');
        } 
    } catch(err){
        res.json(err);
    }
});

app.post('/auth', async(req, res)=>{
    const {email, password} = req.body;
    const user = await User.findOne({where:{email:email}});
    if(user!=null){
        const verification = bcrypt.compareSync(password, user.password);
        if(verification){
            jwt.sign({id:user.id,email:user.email}, jwtSecret, {expiresIn:'24h'}, (err, token)=>{
                if(err){
                    res.status(400).json({err:"Erro, tente novamente"});
                } 
                res.status(200).json({token});
            });
        } else {
            res.status(400).json({err:"Senha incorreta"});
        }
    } else {
        res.status(404).json({error: "Usuário não encontrado"});
    }
});

app.listen(port,()=>{
    console.log(`Servidor rodando em http://localhost:${port}`);
})