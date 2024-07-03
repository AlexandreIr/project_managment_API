const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');

const port = 8080;

const Project = require('./models/Project');
const User = require('./models/User');
const Task = require('./models/Task');
const projectController = require('./projects/projectController');
const { where } = require('sequelize');

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
    const {email,password} = req.body;
    const u = await User.findOne({
        where:{
            email:email,
        }
    })
    if(u!=null){
        const verification = bcrypt.compareSync(password, u.password);
        if(verification){
            res.redirect('/');
        } else {
            res.json({err:"Senha incorreta"});
        }
    } else {
        res.json({err:"Usuário inexistente!!"});
    }
})

app.listen(port,()=>{
    console.log(`Servidor rodando em http://localhost:${port}`);
})