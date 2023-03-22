const { Router } = require("express");
const { User } = require("../../db");
const CryptoJS = require("crypto-js");
const { transporter } = require("../../emailer");

const router = Router();

router.put("/resetPassword", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email: email } });

  try {
    if (!user) {
      return res.status(401).send({ message: "Email no exist" });
    } else {
      const username = user.username;

      const decryptPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.SECRET_KEY_CRYPTO
      );
      decryptPassword.toString(CryptoJS.enc.Utf8);

      let result = "";
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const charactersLength = characters.length;
      for (let i = 0; i < charactersLength; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }

      const password = result.substring(0, 10);

      await User.update(
        {
          password: CryptoJS.AES.encrypt(
            password,
            process.env.SECRET_KEY_CRYPTO
          ).toString(),
        },
        { where: { email: email } }
      );

      await transporter.sendMail({
        from: 'Koalaxy Company" <koalaxygames@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Cambio de contraseña ", // Subject line
        html: `<h4>Hola ${username}!</h4>
              <p>Te proporcionamos tu nueva contraseña:
              <br> ${password} <br>
             Esperamos que sigas visitando nuestro sitio!<br>
          <br>
          <br>Koalaxy Team.<br>
          <p/>`, // html body
      });
      return res
        .status(200)
        .send(
          "Your password has been updated. Check your email to see your new password!"
        );
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

module.exports = router;
