const { Router } = require("express");
const router = Router();
const { CompanyAlls } = require("../../controllers/companyControllers");

router.get("/", async (req, res) => {
  try {
    const genres = await CompanyAlls();
    if (!genres.length) {
      res.send("There are not genres");
    } else {
      res.send(genres);
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
