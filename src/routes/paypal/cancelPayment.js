const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  res.send("Aca deberia aparecer los metodos de pago nuevamente");
  // esperar la url del carrito para enviar a los metodos de pago nuevamente
});
module.exports = router;
