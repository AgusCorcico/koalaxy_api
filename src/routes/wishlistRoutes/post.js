const { Router } = require("express");
const router = Router();
const { Product, Wishlist, User, Productwish } = require('../../db');


router.post('/', async(req,res) => {

    try {
        const { userId, productId } = req.body;

        let user = await User.findOne({
            where: { id: userId}
        })
        let product = await Product.findOne({
            where: { id: productId}
        })
        let wishlist = null;

        if(!user.wishlistId){
            wishlist = await Wishlist.create();
            await user.update({wishlistId : wishlist.id });
        }else{
            wishlist = await Wishlist.findOne({
                where: { id: user.wishlistId},
                include: { model: Productwish } 
            });
        }

        let findProduct = await wishlist.productwishes?.find(e => e.productId == productId );
        if(findProduct){
            return res.status(401).send('Product already exists in the list')
        }else{
            await Productwish.create({
                wishlistId: wishlist.id,
                productId: product.id,
                img: product.img,
                name: product.name,
                priceProduct: product.price
            });
            res.status(200).send('Product uploaded successfully');
        }
    } catch (err) {
        return res.status(401).send(err);
    }
})



module.exports = router;