const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Project = require('../models/Project');
const authenticator = require('../middlewares/authMid');

router.get('/projects', authenticator,async(req, res)=>{
    const user = req.loggedUser;
    try{
        const projects = await Project.findAll();      
        res.json({user,projects});  
    } catch(err){
        res.json(err);
    }
});
router.get('/project/:id', authenticator, async(req, res)=>{
    const id = req.params.id;
    try {
        const project = await Project.findOne({where:{id:id}});
        res.json(project);
    } catch (err) {
        res.json(err.parent.sqlMessage);
    }
});

router.post('/project', authenticator ,async(req, res)=>{
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

router.delete('/project/:id', authenticator, async(req, res)=>{
    const id = req.params.id;
    try{
        Project.destroy({
            where:{
                id:id
            }
        });
        res.redirect('/projects');
    } catch(err){
        res.json(err);
    }
});

router.put('/project/:id', authenticator, async(req, res)=>{
    const id = req.params.id;
    const {title, description} = req.body;
    try{
        await Project.update({
            title,
            description
        }, {
            where:{id:id}
        });
        res.redirect(`/project/${id}`);
    } catch(err){
        res.json(err);
    }
});

module.exports = router;