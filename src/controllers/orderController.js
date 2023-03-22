const axios = require("axios");
const { Product,User,Order } = require("../db.js");


const addOrder = async(total,userId,productsId)=>{

    const order = await Order.create({
        total:total,
        userId:userId,
    })

    let allproducts = await Product.findAll({
        where : {id:productsId}
    }) 


    order.addProduct(allproducts)
    
    return "se creo la orden";
}


module.exports = {addOrder}