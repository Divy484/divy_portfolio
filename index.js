const express = require("express");
const nodemailer = require("nodemailer");
const app = express();

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
                user: 'divympatel21@gnu.ac.in', // Update with your Gmail email address
                pass: 'Divyp@tel484' // Update with your Gmail password
            }
        });

        // Configure the email message
        const mailOptions = {
            from: 'Portfolio',
            to: 'divympatel21@gnu.ac.in', // Use the retrieved email address
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

app.listen(2004, () => {
    console.log("server listening on port 2004");
});