const sequelize = require('sequelize');
const connection = require('../db/db');
const Project = require('./Project');

const Task = connection.define('tasks', {
    task:{
        type:sequelize.STRING,
        allowNull:false
    }
});

Project.hasMany(Task);
Task.belongsTo(Project);


module.exports = Task;
