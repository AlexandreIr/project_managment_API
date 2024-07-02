const express = require('express');
const app = express();
const port = 8080;
const Project = require('./models/Project');
const { where } = require('sequelize');

app.use(express.json());

app.get('/', async(req, res)=>{
    try{
        const projects = await Project.findAll();      
        res.json(projects);  
    } catch(err){
        res.json(err);
    }
});

app.get('/:id', async(req, res)=>{
    const id = req.params.id;
    try{

        const project = await Project.findOne({
            where:{
                id:id
            }
        });
        res.json(project);
    } catch(err){
        res.json(err);
    }
})

app.post('/', async(req, res)=>{
    const {title, description} = req.body;
    try {
        Project.create({
            title,
            description
        });
        res.redirect('/');
    } catch (err) {
        res.json({err});
    }
});
app.delete('/:id', async(req, res)=>{
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
app.put('/:id', async(req, res)=>{
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

app.listen(port,()=>{
    console.log(`Servidor rodando em http://localhost:${port}`);
})