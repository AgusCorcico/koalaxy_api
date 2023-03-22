const { Router } = require("express");
const router = Router();
const { User } = require('../../db');
const verifyToken = require("../../verifyToken");
const CryptoJS = require("crypto-js");
const { where } = require("sequelize");
 

router.put("/:id", async(req,res)=>{
    try{
        const {id} = req.params;
        const user = await User.findOne({
            where:{id:id}
        })
        
        console.log(user)

        if(user.is_admin === false){
            const useredit =  await User.update({is_admin : true}, {where: {id:id}})
            res.send("updated user to admin")
        }else{
            return res.send("this user is already an administrator")
        }

    }catch(err){
        console.log(err)
    }
    

})


module.exports = router