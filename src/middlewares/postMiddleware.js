  // const { Product } = require("../db");

/* const validationMiddleware = async (req, res, next) => {
  const {
    name,
    description,
    img,
    price,
    company,
    genre,
    gameMode,
    MinRequirements,
    RecommendRequirements,
    released,
  } = req.body; */

  //   if (!name) return res.status(404).json({ error: "Missing name" });
  //   if (!description)
  //     return res.status(404).json({ error: "Missing description" });
  //   if (!price) return res.status(404).json({ error: "Missing price" });
  //   if (!company) return res.status(404).json({ error: "Missing company" });
  //   if (!genre) return res.status(404).json({ error: "Missing genre" });
  //   if (!gameMode) return res.status(404).json({ error: "Missing gamemode" });
  //   if (!released) return res.status(404).json({ error: "Missing released" });
  //   if (!MinRequirements)
  //     return res.status(404).json({ error: "Missing min requirements" });
  //   if (!RecommendRequirements)
  //     return res.status(404).json({ error: "Missing recommend requirements" });
  //   if (!img) return res.status(404).json({ error: "Missing image" });

  //   const validationDb = await Product.findOne({ where: { name: name } });
  //   if (validationDb)
  //     return res.status(404).json({ error: "The product already exists" });

  //   next();
  // };

//module.exports = { validationMiddleware };
