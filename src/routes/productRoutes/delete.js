const { Router } = require("express");
const { Product } = require("../../db");

const router = Router();

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Product.destroy({
      where: { id: id },
    });

    res.status(200).send("The product was successfully deleted");
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = router;
