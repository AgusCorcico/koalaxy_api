
const { DataTypes } = require('sequelize')

module.exports = function(sequelize){
    return sequelize.define('productwish', {
        name:{
            type:DataTypes.STRING
        },
        img:{
            type:DataTypes.TEXT
        },
        priceProduct:{
            type:DataTypes.DECIMAL
        }
    })
}