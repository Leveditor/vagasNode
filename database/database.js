const Sequelize = require('sequelize');

// Conexão com o banco de dados
const connection = new Sequelize('vagas', 'root', '0102', {
    host: 'localhost', 
    dialect: 'mysql'
});

module.exports = connection;