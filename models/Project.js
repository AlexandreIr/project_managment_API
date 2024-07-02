const sequelize = require('sequelize');
const connection = require('../db/db');

const Project = connection.define('projects',{
    title:{
        type:sequelize.STRING,
        allowNull:false
    }, description:{
        type:sequelize.STRING,
        allowNull:false
    }
});

Project.sync({force:true});

module.exports = Project;