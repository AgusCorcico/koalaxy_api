const { Router } = require("express");
const axios = require("axios");
const mercadopago = require("mercadopago");

const router = Router();
mercadopago.configure({
  access_token:
    "APP_USR-4890727195212624-031512-85bd55b40130b2d65eac83d1be722cd8-1327733016",
});

router.post("/:id", async (req, res) => {
  const { id } = req.params;
  const response = await axios.get(`http://localhost:3000/cart/${id}`);
  const price = response.data.total;
  let order = {
    // Cambiar por datos del body
    items: [
      {
        id: id,
        title: "Digital Product",
        currency_id: "USD",
        quantity: 1,
        unit_price: price,
      },
    ],
    back_urls: {
      success: "http://localhost:3000/pay-order-mercadopago/" + id,
      failure: "http://localhost:5173/home",
      pending: "",
    },
    auto_return: "approved",
    binary_mode: true, // Para solo recibir pagos por tarjeta o saldo de mercadopago. No efectivo
  };

  mercadopago.preferences
    .create(order)
    .then((response) => res.status(200).send({ response }))
    .catch((error) => res.status(400).send({ error: error.message }));
});
module.exports = router;
