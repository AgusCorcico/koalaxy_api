const { Router } = require("express");
const axios = require("axios");
const {
  PAYPAL_API_TEST,
  PAYPAL_API_CLIENT,
  PAYPAL_API_SECRET,
} = require("../../configPaypal");
const router = Router();

router.post("/:id", async (req, res) => {
  const { id } = req.params;
  const responseCarrito = await axios.get(`http://localhost:3000/cart/${id}`);

  const price = responseCarrito.data.total;
  /*  const price = req.body.total */
  // cuando se cree el front para correr este http, cambiar para que lleguen los datos desde el body.
  try {
    const order = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: price,
          },
        },
      ],
      application_context: {
        brand_name: "Koalaxy",
        landing_page: "NO_PREFERENCE",
        user_action: "PAY_NOW",
        return_url:
          "http://localhost:3000/pay-order/" + responseCarrito.data.id,
        cancel_url: `http://localhost:5173/home`,
      },
    };

    //Autenticacion
    const params = new URLSearchParams(); //parámetros de consulta en una URL
    params.append("grant_type", "client_credentials"); //append para agregar propiedades, primero la propiedad, segundo el valor

    const {
      data: { access_token },
    } = await axios.post(
      "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
          username: PAYPAL_API_CLIENT,
          password: PAYPAL_API_SECRET,
        },
      }
    );

    /* console.log(access_token); */
    const response = await axios.post(
      `${PAYPAL_API_TEST}/v2/checkout/orders`,
      order,

      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    /*  console.log(response.data); */

    res.status(200).json(response.data);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("algo salio mal");
  }
});
module.exports = router;
