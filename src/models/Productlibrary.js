
const { DataTypes } = require('sequelize')

module.exports = function(sequelize){
    return sequelize.define('productlibrary', {
        name:{
            type:DataTypes.STRING
        },
        img:{
            type:DataTypes.TEXT
        },
    
    })
}