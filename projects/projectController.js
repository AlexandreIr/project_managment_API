const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Project = require('../models/Project');
const Task = require('../models/Task');
const authenticator = require('../middlewares/authMid');
const cors = require('cors');

router.use(cors());

router.get('/projects',authenticator,async(req, res)=>{
    const user = req.loggedUser;
    try{
        const projects = await Project.findAll({where:{userId:user.id}});      
        res.json({user,projects});  
    } catch(err){
        res.json(err);
    }
});
router.get('/project/:id',authenticator, async(req, res)=>{
    const id = req.params.id;
    try {
        const project = await Project.findOne({where:{id:id}});
        if(project){
            res.json(project);
        } else {
            res.status(404).json({notFound: `projeto ${id} não encontrado`});
        }
    } catch (err) {
        res.json(err.parent.sqlMessage);
    }
});

router.post('/project',authenticator,async(req, res)=>{
    const {title, description} = req.body;
    const user = req.loggedUser;
    try {
        await Project.create({
            title,
            description,
            userId:user.id
        });
        res.status(201).json(user);
    } catch (err) {
        res.json(err);
    }
});

router.delete('/project/:id',authenticator, async(req, res)=>{
    const id = req.params.id;
    const user = req.loggedUser;
    
    try{
        const project = await Project.findOne({where:{id:id}});
        if(!project){
            res.status(404).json({notFound: `projeto ${id} não encontrado`});
        } else {
            Project.destroy({
                where:{
                    id:id
                }
            });
            res.sendStatus(204);
           
        }
    } catch(err){
        res.json(err);
    }
});

router.put('/project/:id',authenticator, async(req, res)=>{
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
            res.status(308).redirect(`/project/${id}`);
        } else {
            res.status(401).json({err:"Usuário não autorizado"});
        }
} catch(err){
        res.json(err);
    }
});

router.post('/task', authenticator, async (req, res)=>{
    const {task} = req.body;
    try{
        await Task.create({
            task
        });
        res.status(201);
    } catch(err){
        alert(`Erro inesperado: ${err}`)
    }
})

module.exports = router;