const sequelize = require('sequelize');
const connection = new sequelize('desafio', 'Alexandre', '46422278As@$',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = connection;