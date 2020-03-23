const express = require("express");
const router = express.Router();
const Registration = require('./../models/registration');
const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, msg, transport) => {
    return new Promise((resolve, reject) => {

        const message = {
            from: process.env.emailUsername,
            to: email,
            subject: subject, // Subject line
            html: `<p>${msg}</p>`
        };
        //var resp = false;
        transport.sendMail(message, function (err, info) {
            if (err) {
                console.log(err);
                resolve(false);
            } else {
                console.log("Email Sent");
                resolve(true);
            }
        });
    });
}



router.get('/feedback', async (req, res) => {
    res.redirect('https://forms.gle/bCRnGm186hpeioUv5');
})

router.get('/emailfeedback', async (req, res) => {

    var data = await Registration.find({});
    //console.log(data);
    if (!data.length) {
        return res.json("error");
    }
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.emailUsername,
            pass: process.env.emailPassword
        },
        secure: true,
        pool: true
    });

    for (let i = 0; i < data.length; i++) {
        console.log(data[i].email);
        var link = "https://naad.dhwanibitmesra.live/naadwhitelogo.png";
        var link2 = "https://naad.dhwanibitmesra.live/api/feed/feedback"
        if (data[i].id >= 96) {
            await sendEmail(data[i].email, "Thank you for participating in NAAD'20!", "<div style='text-align:center'><img src=" + link + "></div><br> Hi " + data[i].name + ",<br><br> Your participation has made our annual music celebration more festive than ever before. We were lucky to have you with us.<br><br> But most importantly, your feedback is valuable to us. We need it to make this fest better in the future. Kindly fill this feedback form <a href=" + link2 + ">here</a>. It will hardly take a minute or two.<br><br>Love you 3000! <br><br>Team NAAD", transport);
        }
    }
    transport.close();
    return res.json("success");

});


module.exports = router;