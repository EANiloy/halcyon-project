const Sequelize = require('sequelize').Sequelize;

const sequelize = new Sequelize('assignment', 'root', 'mysqlroot', { dialect: 'mysql', host: 'localhost', timezone: '+06:00', ssl: true });

module.exports = sequelize;