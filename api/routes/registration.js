const express = require("express");
const router = express.Router();
const Registration = require('./../models/registration');
const Event = require('./../models/event');
const passport = require('passport');
const sendEmail = require('./../utils/sendEmail');



router.get('/', (req, res) => { res.json({ message: "Hello YG" }); });


router.post('/eventReg', async (req, res) => {


    await Registration.find({ id: req.body.id }, async (err, regdata) => {
        if (err) {
            console.log(err);
        }
        else {

            var name;

            if (regdata[0]) {
                name = regdata[0].name;
            }
            else {
                return res.json({
                    status: "error",
                    message: "The NAAD ID doesn't exist."
                });
            }

            var data = [{
                id: req.body.id,
                event: req.body.event,
                name: name,
                memberId: req.body.memberId
            }];
            console.log("Data entered for Event Registration " + req.body.event + ":  " + data[0]);

            await Event.create(data, (err, data) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(data);
                    res.json({
                        status:"success",
                        message:"Stored Succesfully"
                    });
                }
            });




        };
    });


});


router.post('/registration', async (req, res) => {


    console.log("Registration collection connecting...");
    await Registration.find({}, async (err, data) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        else {
            var last = 1;
            if (data.length >= 1) {
                last = data.length + 1;
            }
            else {
                last = 1;
            }

            console.log(data.length);
            var data = [{
                name: req.body.name,
                id: last,
                school: req.body.school,
                contact: req.body.contact,
                email: req.body.email,
                branch: req.body.branch,
                gender: req.body.gender,
                rollNo: req.body.rollNo
            }]


            await Registration.create(data, (err, data) => {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                }
                else {
                    console.log(data[0].email);
                    sendEmail(data[0].email, "Registration for Naad 2020", "<i>Music, even in situations of the greatest horror, should never be painful to the ear but should flatter and charm it, and thereby always remain music. - Mozart</i> <br><br> Congratulations,<b>" + data[0].name + "</b>! You have succesfully registered for Naad'20. Your Naad ID is <strong>NAAD00" + data[0].id + "</strong>. Kindly keep it safe for future purposes. See you around, till then stay musical!<br> Team Naad");
                }
                res.json(data);
            });
        }
    });




    
});


module.exports = router;
