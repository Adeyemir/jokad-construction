require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/contact", (req, res) => {
    res.sendFile(__dirname + "/contact.html");
});

app.get("/about", (req, res) => {
    res.sendFile(__dirname + "/about.html");
});

app.get("/services", (req, res) => {
    res.sendFile(__dirname + "/services.html");
});

app.get("/projects", (req, res) => {
    res.sendFile(__dirname + "/projects.html");
});

app.post("/", (req, res) => {
    const { name, email, subject, tel, message } = req.body;
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "shereefdeen4real@gmail.com",
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    var mailOptions = {
        from: email,
        to: [
            "nearbyconstruction@gmail.com",
            //   "hadebayor4real@gmail.com",
            "herdeybayor4real@gmail.com",
        ],
        subject: subject,
        html: `
    <h1>Hi, From: ${name}</h1>
    <h4>Email: <i>${email}</i></h4>
    <h4>Tel: <i>${tel}</i></h4>
    <br />
    <h3>Message:</h3>
    <p>${message}</p>
    `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.sendFile(__dirname + "/failure.html");
        } else {
            console.log("Email sent: " + info.response);
            res.sendFile(__dirname + "/success.html");
        }
    });
});

app.post("/failure", (req, res) => {
    res.redirect("/");
});

app.post("/success", (req, res) => {
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server started at port ${port}. Visit http://localhost:${port}`);
});
