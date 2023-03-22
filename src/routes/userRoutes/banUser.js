const { Router } = require("express");
const router = Router();
const { User } = require('../../db');
const verifyToken = require("../../verifyToken");
const CryptoJS = require("crypto-js");


router.put('/:id',  /* verifyToken, */ async(req,res)=>{
    const { id } = req.params;

        try {
            const banUser = await User.update(
                { is_banned: true },
                { where: { id: id} }
            )
            res.send('User has been banned')
        } catch (err) {
            console.log(err)
        }
})


module.exports = router;