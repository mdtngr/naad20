const express = require("express");
const router = express.Router();
const Registration = require('./../models/registration');
const Event = require('./../models/event');
const Count = require('./../models/counter');
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
                    message: "NAAD00"+req.body.id+" doesn't exist."
                });
            }
		var check=null;
            for(x in req.body.memberId){
                await Registration.findOne({id:req.body.memberId[x]},function(err,data){
                    if(err){
                        console.log(err);
                    }
                    else{
			console.log(data);
                        if(!data){
                            check=req.body.memberId[x];
                            return;
                        }
                    }
                });
                if(check){
                    return res.json({
                        status: "error",
                        message: "NAAD00"+check+" doesn't exist."
                    });
                }
                
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
                    return res.json({
                        status: "error",
                        message: "Some error occured"
                    });
                }
                else {
                    console.log(data);
                }
            });
            return res.json({
                status: "success",
                message: "Stored Succesfully"
            });



        };
    });



});





router.post('/registration', async (req, res) => {
    
    console.log("Registration collection connecting...");
    var x = await Count.findOneAndUpdate({},{$inc : {count:1}},{upsert:true,new:true} );
    //console.log(x.count);
    if(!x.count){
        return res.json("error");
    }

    var last = x.count;
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
            var link = "https://naad.dhwanibitmesra.live/naadwhitelogo.png";
            sendEmail(data[0].email, "Registration for NAAD'20", "<div style='text-align:center'><img src=" + link + "></div><i>Music, even in situations of the greatest horror, should never be painful to the ear but should flatter and charm it, and thereby always remain music. - Mozart</i> <br><br><br> Congratulations, <b>" + data[0].name + "</b>! You have succesfully registered for NAAD'20. Your NAAD ID is <strong>NAAD00" + data[0].id + "</strong>. Kindly keep it safe for future purposes.<br><br>For any queries, feel free to reply to this email or contact dhwani.bitmesra@gmail.com.<br><br> See you around, till then, stay musical!<br><br> Team NAAD");
        }
        res.json(data);
    });
});


module.exports = router;
