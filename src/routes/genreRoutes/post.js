const { Router } = require("express");
const router = Router();
const { Genre } = require("../../db");

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    if (name) {
      const findGenre = await Genre.findOne({
        where: { name: name }
      })
      if(!findGenre){
      await Genre.create({
        name: name ,
      });
        res.send("Genre created successfully");
      }else{
        res.send('The genre is already created.') 
      }
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

