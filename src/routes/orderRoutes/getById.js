const { Router } = require('express');
const { where } = require('sequelize');
const router = Router();
const {Order,User,Product}= require('../../db');

router.get('/:id', async(req,res)=>{
    try {
        const {id} = req.params
        const orders = await Order.findAll({
            where :{
                userId : id
            },
            include:[
                {
                    model:User,
                    where: {id: id}
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