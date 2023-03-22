const { Router } = require("express");
const router = Router();
const { Op } = require('sequelize');
const { User, Role } = require('../../db');
const CryptoJS = require("crypto-js");
const { transporter } = require('../../emailer');


router.post('/register', async(req,res)=>{
    const { username, name, last_name, email, password, img, date, description, genre,is_admin } = req.body;
  
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }]
      }
    });
  
    if (existingUser) {
      if (existingUser.username === username) {
        return res.status(400).send({ message: "El nombre de usuario ya está en uso" });
      } else if (existingUser.email === email) {
        return res.status(400).send({ message: "El correo electrónico ya está en uso" });
      }
    }
  
    await User.create({
      username,
      name,
      last_name,
      email,
      password: CryptoJS.AES.encrypt(password, process.env.SECRET_KEY_CRYPTO).toString(),
      img,
      date,
      description,
      genre,
      is_admin
    });
    await transporter.sendMail({
      from: '"Koalaxy Company" <koalaxygames@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Bienvenido!", // Subject line
      html: `<h4>Hola ${username}!</h4>
            <p>Te damos la bienvenida a Koalaxy Games!
        Esperamos que tengas una buena experiencia y puedas disfrutar de los mejores juegos en linea.<br>
        <br>
        <br>Koalaxy Team.<br>
        <p/>`, // html body
    });
    res.status(200).send({ message: "El usuario se ha registrado correctamente" });
  });


module.exports = router;