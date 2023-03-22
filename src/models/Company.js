const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('company', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        paranoid: true,
    });
};