const express = require("express");
const router = express.Router();
const Registration = require('./../models/registration');


router.post('/registration',async (req,res)=>{

    var last  =0;

    await Registration.find({},(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            if(data.length>=1){
                last = data[data.length-1].id+1;
            }
            else{
                last = 1;
            }
            
            //console.log(data.length);
        }
    });
    console.log(last);

    var data = [{
        name:req.body.name,
        id: last,
        school:req.body.school,
        contact:req.body.contact,
        email:req.body.email,
        branch:req.body.branch,
        gender:req.body.gender,
        rollNo: req.body.rollNo
    }]


    await Registration.create(data,(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(data);
        }
    });

    res.json(data);
});


module.exports = router;