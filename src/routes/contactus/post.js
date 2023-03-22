const { Router } = require("express");
const {Contactus} = require("../../db")
const {transporter} = require("../../emailer")

const router = Router();

router.post("/create", async(req,res)=>{
  try{
    const { name, email, description } = req.body;
    console.log(name,description,email)
    const createdContactUs = await Contactus.create({
      name: name,
      description:description,
      email:email
    });
         await transporter.sendMail({
          from:  '"Koalaxy Company" <koalaxygames@gmail.com>', // sender address
          to: email, // list of receivers
          subject: `Bienvenido ${name}`, // Subject line
          html: `<!DOCTYPE html>
          <html>
          <body>
          <h1>Hola, ${name} </h1>
          <h1>Gracias por contactarnos</h1>
          <h1>Enseguida nos pondremos en contacto con usted</h1>
          <h3>Este es su mensaje: ${description}</h3>
          </body>
          </html>`, // html body
        }); 


        await transporter.sendMail({
          from: email, // sender address
          to: "koalaxygames@gmail.com" , // list of receivers
          subject: `Mensaje de ${name}`, // Subject line
          html: `<!DOCTYPE html>
          <html>
          <body>
          <h1>Hola Koalaxy, tienes una consulta de ${name} </h1>
          <h1>Responde a su mensaje!</h1>
          <h3>Este es su mensaje: ${description}</h3>
          </body>
          </html>`, // html body
        }); 



      res.status(201).send(createdContactUs);
    } catch (error) {
      console.log(error)
    }
})
module.exports = router;