const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Project = require('../models/Project');

router.get('/projects', async(req, res)=>{
    try{
        const projects = await Project.findAll({
            include:[{model:User}]
        });      
        res.json(projects);  
    } catch(err){
        res.json(err.parent.sqlMessage);
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

router.post('/project', async(req, res)=>{
    const {title, description} = req.body;
    try {
        Project.create({
            title,
            description,
        });
        res.redirect('/');
    } catch (err) {
        res.json(err);
    }
});

router.delete('/project/:id', async(req, res)=>{
    const id = req.params.id;
    try{
        Project.destroy({
            where:{
                id:id
            }
        });
        res.redirect('/');
    } catch(err){
        res.json(err);
    }
});

router.put('/project/:id', async(req, res)=>{
    const id = req.params.id;
    const {title, description} = req.body;
    try{
        await Project.update({
            title,
            description
        }, {
            where:{id:id}
        });
        res.redirect(`/${id}`);
    } catch(err){
        res.json(err);
    }
});