const { Router } = require("express");
const {Contactus} = require("../../db")

const router = Router();

router.get("/", async(req,res)=>{
    const { name } = req.query;
  try {
    if (!name) {
      const allContactUs = await Contactus.findAll();
      return res.send(allContactUs);
    } else {
      let contactUs = await Contactus.findAll({
        where: {
          name: {
            [Op.like]: "%" + name + "%",
          },
        },
      });
      if (!contactUs[0]) {
        return res.status(404).json({ error: "No existe ese nombre" });
      }
      return res.send(contactUs);
    }
  } catch (error) {
    res.status(404).send(error.message);
  }

})

module.exports = router;