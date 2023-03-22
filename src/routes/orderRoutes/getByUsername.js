const { Router } = require('express');
const { where } = require('sequelize');
const router = Router();
const {Order,User,Product}= require('../../db');

router.get('/', async(req,res)=>{
    try {
        const {username} = req.query
        const orders = await Order.findAll({
            include:[
                {
                    model:User,
                    where: {username: username}
                },
                {
                    model:Product
                }
            ]
        });
        if(!orders){
            res.send('There are not orders')
        }else{
            res.send(orders)
        }
    } catch (err) {
        console.log(err)
    }
})

module.exports = router