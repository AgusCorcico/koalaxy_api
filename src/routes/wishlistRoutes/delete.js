const { Router } = require("express");
const router = Router();
const { Productwish } = require('../../db');

router.delete('/', async(req,res) => {

    try {
        const { productWishId } = req.query;

        console.log(productWishId);

        let productWish = await Productwish.findOne({
            where: { id: productWishId }
        });
        if(!productWish){
            res.send("Can't delete a product you didn't add")
        }
        await productWish.destroy();
        res.send('Product has been removed');
    } catch (err) {
        console.log(err)
    }
})



module.exports = router;