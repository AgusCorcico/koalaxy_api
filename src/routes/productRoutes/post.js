const { Router } = require("express");
const { Product } = require("../../db");
//const { validationMiddleware } = require("../../middlewares/postMiddleware");

const router = Router();

router.post("/", async (req, res) => {
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

  const productCreated = await Product.create({
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
  });

  res.status(200).send(productCreated);
});

module.exports = router;
