const Sequelize = require('sequelize');
const connection = require('./database');

                            //   nome da tabela
const Vagas = connection.define('vagas', {
    // criando a tabela no mysql
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },

    empresa: {
        type: Sequelize.STRING,
        allowNull: false
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false
    },

    salario: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

// criar tabala no banco
Vagas.sync({force: false}).then(() =>{});

// Exportando a tabela de Vagas
module.exports = Vagas; 