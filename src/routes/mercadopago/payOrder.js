const { Router } = require("express");
const { Cart, User, Productcart } = require("../../db.js");
const { addProductLibrary } = require("../../controllers/libraryController.js");
const { updateTotalValue } = require("../../controllers/cartController.js");
const { transporter } = require("../../emailer");

const router = Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
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

    for (let i = 0; i < productos.length; i++) {
      await addProductLibrary(productos[i], usuario);
    }

    Productcart.destroy({
      where: {
        cartId: cart.id,
      },
    });

    await updateTotalValue(cart);

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
    return res.send("Thanks for your purchase");
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

module.exports = router;
