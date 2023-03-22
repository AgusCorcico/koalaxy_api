const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {

    sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: {
                    args: [3, 50],
                    msg: "The username must have a range of 3 to 50 characters"
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
            validate: {
                isEmail: {
                    msg: "The email must be a valid email"
                },
                len: {
                    args: [3, 50],
                    msg: "The email must have a range of 3 to 50 characters"
                }
            }
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        img:{
            type:DataTypes.TEXT,
            defaultValue:"https://w7.pngwing.com/pngs/741/68/png-transparent-user-computer-icons-user-miscellaneous-cdr-rectangle-thumbnail.png"
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        genre: {
            type: DataTypes.ENUM('male','female','other')
        },
        is_banned:{
            type:DataTypes.BOOLEAN,
            defaultValue: false
        },
        is_admin:{
            type:DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        paranoid: true,
    });
};