const { User } = require('../db');
const { Op } = require("sequelize");


const getAllUsers = async () => {
    try {
        const users = await User.findAll();

        return users;
    } catch (err) {
        console.log(err)
    }
}

const getByName = async (username) => {
    try {
        const user = await User.findAll({
            where: 
                { username: 
                    {
                        [Op.iLike]: `%${username}%`,
                    }
                }
        })
        return user;
    } catch (err) {
        console.log(err)
    } 
}

const getById = async (id) => {
    try {
        const userById = await User.findOne({
            where: { id: id }
        })
        return userById;
    } catch (err) {
        console.log(err)
    } 
}


const getByEmail = async (email) => {
    try {
        const userByEmail = await User.findOne({
            where: { email }
        })
        return userByEmail
    } catch (err) {
        console.log(err)
    } 
}


module.exports = { getAllUsers, getByName, getById, getByEmail };