const nodemailer = require("nodemailer");

const { PASSEMAILER, MAIL } = process.env;

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: MAIL, // generated ethereal user
      pass: PASSEMAILER, // generated ethereal password
    },
    tls: {
        rejectUnauthorized: false
    }
});


transporter.verify().then(() => {
    console.log('Ready for send emails')
})

module.exports = { transporter };