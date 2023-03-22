const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('library', {
        id: {
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
    },
    {
        timestamps: false
    }
    );
};