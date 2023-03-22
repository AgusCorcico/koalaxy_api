const { Router } = require("express");
const router = Router();
const { User } = require('../../db');
const verifyToken = require("../../verifyToken");

router.delete('/:id',/* verifyToken, */ async(req,res)=>{
    const { id } = req.params;
    try {
        if(id){
            await User.destroy({
                where: { id: id }
            })
            res.send('User deleted successfully')
        }
    } catch (err) {
        console.log(err)
    }
})


module.exports = router;