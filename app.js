require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (_req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/contact", (_req, res) => {
    res.sendFile(__dirname + "/contact.html");
});

app.get("/about", (_req, res) => {
    res.sendFile(__dirname + "/about.html");
});

app.get("/services", (_req, res) => {
    res.sendFile(__dirname + "/services.html");
});

app.get("/projects", (_req, res) => {
    res.sendFile(__dirname + "/projects.html");
});

app.post("/", (req, res) => {
    const { name, tel, email, message, subject = process.env.DEFAULT_SUBJECT } = req.body;
    var transporter = nodemailer.createTransport({
        service: "gmail",
        // port: 587,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        }
    });

    var mailOptions = {
        from: email,
        to: process.env.SEND_TO_EMAILS.split(","), // list of receivers
        subject: subject,
        html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #4CAF50;">New Quotation Request</h2>
            <p><strong>From:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #1a73e8;">${email}</a></p>
            <p><strong>Phone:</strong> ${tel}</p>
            <hr style="border: 1px solid #ddd;" />
            <h3>Message:</h3>
            <p style="white-space: pre-line; line-height: 1.6;">${message}</p>
            <hr style="border: 1px solid #ddd;" />
            <p>This email was sent from your website's quotation request form.</p>
        </div>
    `,
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            res.sendFile(__dirname + "/failure.html");
        } else {
            console.log("Email sent: " + info.response);
            res.sendFile(__dirname + "/success.html");
        }
    });
});

app.post("/failure", (_req, res) => {
    res.redirect("/");
});

app.post("/success", (_req, res) => {
    res.redirect("/");
});

app.get("/ping", (_req, res) => {
    res.send("pong")
})

app.listen(port, () => {
    console.log(`Server started at port ${port}. Visit http://localhost:${port}`);
});
