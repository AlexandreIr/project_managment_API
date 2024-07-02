const express = require('express');
const app = express();
const port = 8080;
const Project = require('./models/Project');

app.get('/', (req, res)=>{
    
})

app.listen(port,()=>{
    console.log(`Servidor rodando em http://localhost:${port}`);
})