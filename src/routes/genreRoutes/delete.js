const { Router } = require('express');
const router = Router();
const { Genre } = require('../../db');


router.delete('/:id', async(req,res)=>{

    const { id } = req.params;
    try {
            await Genre.destroy({
                where: { id: id }
            })
            res.send('Genre deleted successfully')
    } catch (err) {
        console.log(err)
    }
})


module.exports = router;