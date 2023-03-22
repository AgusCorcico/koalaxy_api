const { Router } = require("express");
const router = Router();
const { User } = require('../../db');
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');

router.post('/login', async(req,res)=> {
    const { email, password } = req.body;

        const user = await User.findOne({
            where: { email: email }
        })

        if (!user) {
            return res.status(401).send({message: "Email is invalid"});
        }
        if(user.is_banned){
            return res.status(401).send({message: "You are banned. Please contact with support channel"});
        }

        const decryptPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY_CRYPTO);
        const originalPassword = decryptPassword.toString(CryptoJS.enc.Utf8);

        if (originalPassword !== password) {
            return res.status(401).send({message: "The password is invalid"});
        }

        const accessToken = jwt.sign(
            {id: user.id, is_admin: user.is_admin},
            process.env.SECRET_KEY_CRYPTO,
            {expiresIn:86400}
        );

        return res.status(200).send({user, accessToken});

})

module.exports = router;