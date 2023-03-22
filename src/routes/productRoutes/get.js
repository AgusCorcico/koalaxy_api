const { Router } = require("express");
const { Product } = require("../../db");
const { Op } = require("sequelize");

const router = Router();

router.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    if (!name) {
      const allProducts = await Product.findAll();
      res.send(allProducts);
    } else {
      const response = await Product.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
      });

      const productName = response.map((product) => {
        return {
          img: product.img,
          name: product.name,
          genre: product.genre,
          MinRequirements: product.MinRequirements,
          RecommendRequirements: product.RecommendRequirements,
          calification: product.calification,
          released: product.released,
          price: product.price,
          stock: product.stock,
          discount: product.discount,
          description: product.description,
          company: product.company,
        };
      });

      if (productName.length) {
        res.status(200).send(productName);
      } else {
        res.status(404).send("Product not found");
      }
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const productDb = await Product.findByPk(id);
    res.status(200).json(productDb);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
