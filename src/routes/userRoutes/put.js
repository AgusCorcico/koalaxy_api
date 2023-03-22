const { Router } = require("express");
const router = Router();
const { User } = require('../../db');
const verifyToken = require("../../verifyToken");
const CryptoJS = require("crypto-js");


router.put('/:id',  /* verifyToken, */ async(req,res)=>{
    const { id } = req.params;
    let { username, name, last_name, email, password, img, date, description, genre, is_admin, is_banned } = req.body;

    if(req.user.id == id || req.user.is_admin){
        if(password){
            password = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY_CRYPTO).toString()
        }
        try {
            const updateUser = await User.update(
                { username, name, last_name, email, password, img, date, description, genre, is_admin, is_banned },
                { where: { id: id} }
            )
            res.send('User has been updated')
        } catch (err) {
            console.log(err)
        }
    }

})


module.exports = router;