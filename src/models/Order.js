const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('order', {
        id: {
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        total:{
            type:DataTypes.INTEGER,
            allowNull: false,
        }
    },
);
};