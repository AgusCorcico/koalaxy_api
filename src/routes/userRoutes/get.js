const { Router } = require("express");
const router = Router();
const { getAllUsers, getByName, getById, getByEmail } = require('../../controllers/userControllers');
const verifyToken = require("../../verifyToken");

router.get('/', /* verifyToken, */ async(req,res)=>{
    const { username, email } = req.query;
    try {
        if(username) { 
            const user = await getByName(username);
            res.send(user)
        }else if(email){
            const user = await getByEmail(email);
            res.send(user)
        }else{
            const users = await getAllUsers();
            res.send(users)
        }
    } catch (err) {
        console.log(err)
    }
})

router.get('/:id', /* verifyToken, */ async(req,res)=>{
    const { id } = req.params;
    try {
        if(id) { 
            const user = await getById(id);
            if(!user){
                res.send('Invalid id')
            }else{
                res.send(user)
            }
        }else{
            const users = await getAllUsers();
            res.send(users)
        }
    } catch (err) {
        console.log(err)
    }
})



module.exports = router;