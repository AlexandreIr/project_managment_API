const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Project = require('../models/Project');
const authenticator = require('../middlewares/authMid');

router.use(authenticator);

router.get('/projects',async(req, res)=>{
    const user = req.loggedUser;
    try{
        const projects = await Project.findAll({where:{userId:user.id}});      
        res.json({user,projects});  
    } catch(err){
        res.json(err);
    }
});
router.get('/project/:id', async(req, res)=>{
    const id = req.params.id;
    try {
        const project = await Project.findOne({where:{id:id}});
        res.json(project);
    } catch (err) {
        res.json(err.parent.sqlMessage);
    }
});

router.post('/project' ,async(req, res)=>{
    const {title, description} = req.body;
    const user = req.loggedUser;
    try {
        await Project.create({
            title,
            description,
            userId:user.id
        });
        res.json(user);
    } catch (err) {
        res.json(err);
    }
});

router.delete('/project/:id', async(req, res)=>{
    const id = req.params.id;
    const user = req.loggedUser;
    const project = await Project.findOne({where:{id:id}});

    try{
        if(user.id==project.userId){
            Project.destroy({
                where:{
                    id:id
                }
            });
            res.redirect('/projects');
        } else {
            res.status(401).json({err:"Usuário não autorizado"});
        }
    } catch(err){
        res.json(err);
    }
});

router.put('/project/:id', async(req, res)=>{
    const id = req.params.id;
    const {title, description} = req.body;
    const user = req.loggedUser;
    const project = await Project.findOne({where:{id:id}});
    try{
        if(user.id==project.userId){
            await Project.update({
                title,
                description
            }, {
                where:{id:id}
            });
            res.redirect(`/project/${id}`);
        } else {
            res.status(401).json({err:"Usuário não autorizado"});
        }
} catch(err){
        res.json(err);
    }
});

module.exports = router;