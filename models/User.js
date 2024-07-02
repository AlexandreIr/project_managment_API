const sequelize = require('sequelize');
const connection = require('../db/db');
const Project = require('./Project');

const User = connection.define('users', {
    name:{
        type:sequelize.STRING,
        allowNull:false
    },email:{
        type:sequelize.STRING,
        allowNull:false
    },password:{
        type:sequelize.STRING,
        allowNull:false
    }
});
User.hasMany(Project);
Project.belongsTo(User);

module.exports = User;