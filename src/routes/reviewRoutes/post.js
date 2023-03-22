const { Router } = require("express");
const router = Router();
const { Review } = require("../../db");
const  {  Productlibrary, Library, User }  = require("../../db");


router.post("/", async (req, res) => {
    const { userId, productId, calification, comment } = req.body;

    const user = await User.findOne({
        where: { id: userId}
    });

    const library = await Library.findOne({
        where: { id: user.libraryId },
        include: { model: Productlibrary}
    });

    const findProduct = await library.productlibraries?.find(e => e.productId == productId);



    if(findProduct){
        try {
            let newComment = await Review.create({
                userId,
                productId,
                calification,
                comment
            })
            res.status(200).send(newComment)
        } catch (error) {
            console.log(error)
        }
    }else{
        res.status(400).send('Comment only those who bought the game! Sorry.')
    }

})


module.exports = router;