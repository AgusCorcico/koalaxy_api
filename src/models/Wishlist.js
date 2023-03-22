const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {

    sequelize.define('wishlist', {
        id: {
            type: DataTypes.INTEGER,
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