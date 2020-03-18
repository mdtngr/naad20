const express = require("express");
const router = express.Router();
const sendEmail = require('./../utils/sendEmail');
const Registration = require('./../models/registration');



router.get('/feedback', async (req, res) => {
    res.redirect('https://forms.gle/bCRnGm186hpeioUv5');
})

router.get('/emailfeedback', async (req, res) => {

    var data = await Registration.find({});
    //console.log(data);
    if (!data.length) {
        return res.json("error");
    }

    for (let i = 0; i < data.length; i++) {
        console.log(data[i].email);
        var link = "https://naad.dhwanibitmesra.live/naadwhitelogo.png";
        var link2 = "https://naad.dhwanibitmesra.live/api/feed/feedback"
        await sendEmail(data[i].email, "Thank you for participating in NAAD'20!", "<div style='text-align:center'><img src=" + link + "></div><br> Hi " + data[i].name + ",<br><br> Your participation has made our annual music celebration more festive than ever before. We were lucky to have you with us.<br><br> But most importantly, your feedback is valuable to us. We need it to make this fest better in the future. Kindly fill this feedback form <a href=" + link2 + ">here</a>. It will hardly take a minute or two.<br><br>Love you 3000! <br><br>Team NAAD");
    }

    return res.json("success");

});


module.exports = router;