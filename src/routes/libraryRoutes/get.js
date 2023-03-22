const { Router } = require("express");
const { Model } = require("sequelize");
const router = Router();


const { User, Library, Productlibrary, Product } = require("../../db");


router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      let library = await Library.findOne({
        include: [
          {
            model: User,
            where: { id: id },
          },
          {
            model: Productlibrary,
            include: { 
                model: Product,
            },
          },
        ],
        order: [[Productlibrary, "createdAt", "DESC"]],
      });
      /*    console.log(cart.total); */
      res.send(library);
    } catch (err) {
      console.log(err);
    }
  });
  
  module.exports = router;
