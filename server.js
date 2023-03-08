const express = require("express");
const next = require("next");
const nodemailer = require("nodemailer");
require("dotenv").config();

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const server = express();
server.use(express.json());
server.use(express.urlencoded());

server.post("/contact", (req, res) => {
  console.log("email request ========", req.body);
  const transporter = nodemailer.createTransport({
    host: 'mail.axc.nl',
    port:465,

    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_ADDR,
      pass: process.env.EMAIL_PASSWORD,

    },
  });
  console.log(
    "==============auth",
    process.env.EMAIL_ADDR,
    process.env.EMAIL_PASSWORD
  );
  const mailOptions = {
    from: `${req.body.name}   ${req.body.email}`,
    to: process.env.EMAIL_ADDR,
    subject: `Contact form submit from ${req.body.name}`,
    text: `Email :  ${req.body.email}  \n
    Name : ${req.body.name} \n
    Message : \n
    ${req.body.message}
    `,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("------------------err ", error);
      return res.status(500).json({ message: "Error accured" });
    }
    return res.json({ message: " Email sent successfully" });
  });
});

app.prepare().then(() => {
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
