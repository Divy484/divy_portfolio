const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
require('dotenv').config();

const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/portfolio.html");
});

app.post("/send", async (req, res) => {
    let { name, email, mobile_number, email_subject, message } = req.body;

    try {
        // Create a nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL, // Update with your Gmail email address
                pass: process.env.PASSWORD // Update with your Gmail password
            }
        });

        // Configure the email message
        const mailOptions = {
            from: 'Portfolio',
            to: process.env.EMAIL, // Use the retrieved email address
            subject: email_subject,
            text: `Name: ${name},
        Email: ${email},
        Mobile Number: ${mobile_number},
        Message: ${message}`
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        res.redirect("/?success=Thanks for contacting me!!");
    } catch (err) {
        console.log(err);
        res.redirect("/?success=Something went wrong!!");
    }
});

app.listen(port, () => {
    console.log("server listening on port 2004");
});