const sequelize = require('sequelize');
const connection = require('../db/db');
const User = require('./User');

const Project = connection.define('projects',{
    title:{
        type:sequelize.STRING,
        allowNull:false
    }, description:{
        type:sequelize.TEXT,
        allowNull:false
    }
});
User.hasMany(Project);
Project.belongsTo(User);


module.exports = Project;