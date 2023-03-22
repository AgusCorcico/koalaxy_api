const { Router } = require("express");
const { Product } = require("../../db");

const router = Router();

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      stock,
      img,
      price,
      calification,
      company,
      genre,
      gameMode,
      MinRequirements,
      RecommendRequirements,
      comments,
      discount,
      released,
    } = req.body;

    const updateproduct = await Product.update(
      {name,description,stock,img,price,calification,company,genre,gameMode,MinRequirements,RecommendRequirements,comments,discount,released},
      { where: { id : id } }
  )

    res.status(200).send("actualizado");
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error.message });
  }
});
module.exports = router;
