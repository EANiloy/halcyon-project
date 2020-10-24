const Sequelize = require('sequelize');
const sequelize = require('../Database/db');

const user = sequelize.define('user',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement:true
    },
    userName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:'coposite'
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:'composite'
    },
    email: {
        type: Sequelize.STRING,
        allowNull:false
    },
    phnNo: {
        type: Sequelize.STRING,
        allowNull:false
    },
    userType: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue:"Regular"
    }
});

module.exports = user;