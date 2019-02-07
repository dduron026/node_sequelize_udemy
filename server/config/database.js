const Sequelize = require('sequelize');

module.exports = new Sequelize('agencia', 'root', 'root', {

    host: 'localhost',
    port: '',
    dialect: 'mysql',
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorsAliases: false

})