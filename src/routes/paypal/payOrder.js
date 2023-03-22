const { Router } = require("express");
const axios = require("axios");
const { Cart, User, Productcart } = require("../../db.js");
const { addProductLibrary } = require("../../controllers/libraryController.js");
const { updateTotalValue } = require("../../controllers/cartController.js");
const { transporter } = require("../../emailer");
const {addOrder} = require("../../controllers/orderController")

const {
  PAYPAL_API_TEST,
  PAYPAL_API_CLIENT,
  PAYPAL_API_SECRET,
} = require("../../configPaypal");

const router = Router();

router.get("/:id", async (req, res) => {
  //ACA AGUS!!!
  const { id } = req.params;
  const { token } = req.query;
  try {
    await axios.post(
      `${PAYPAL_API_TEST}/v2/checkout/orders/${token}/capture`,
      {},
      {
        auth: {
          username: PAYPAL_API_CLIENT,
          password: PAYPAL_API_SECRET,
        },
      }
    );
    /*  console.log(response.data);  */
    let cart = await Cart.findOne({
      include: [
        {
          model: User,
          where: { id: id },
        },
        {
          model: Productcart,
        },
      ],
      order: [[Productcart, "createdAt", "DESC"]],
    });

    const usuario = cart.user.id;
    const productos = cart.productcarts.map((e) => e.productId);
    const total = cart.total;

    for (let i = 0; i < productos.length; i++) {
      await addProductLibrary(productos[i], usuario);
    }

    Productcart.destroy({
      where: {
        cartId: cart.id,
      },
    });

    await updateTotalValue(cart);

    await addOrder(total,usuario,productos);

    const email = cart.user.email;
    const username = cart.user.username;

    await transporter.sendMail({
      from: '"Koalaxy Company" <koalaxygames@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Bienvenido!", // Subject line
      html: `<h4>Hola ${username}!</h4>
            <p>Muchas gracias por tu compra!!!
        En tu biblioteca vas a poder ver todos tus juegos comprados. 
        Segui disfrutando de los mejores juegos en linea en la mejor plataforma!<br>
        <br>
        <br>Koalaxy Team.<br>
        <p/>`, // html body
    });

    return res.send("Thanks for your purchase"); // Datos del cliente, para manipular desde el front
  } catch (error) {
    console.log(error);
    return res.status(505).send("error");
  }
});
module.exports = router;
