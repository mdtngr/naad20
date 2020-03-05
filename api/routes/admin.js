const express = require("express");
const router = express.Router();
const passport = require('passport');
const Admin = require('./../models/admin');
const Event = require('./../models/event');
const Registration = require('./../models/registration');

router.get('/', async (req, res) => {
    return res.render('login');
});


router.get('/login', async (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('findEvent');
    }
    return res.render('login');
});

router.post('/login', passport.authenticate('local', {
    failureRedirect: 'login',
    failureFlash: true
}), (req, res) => {
    console.log(req.body);
    res.redirect('findEvent');
});

router.get('/register', async function (req, res) {
    //console.log("Police request recieved.");
    const newAdmin = new Admin({ username: 'admin' });
    await Admin.register(newAdmin, "admin", function (err, user) {
        if (err) {
            console.log(err);
        }
        console.log(user);
    });
    res.sendStatus(200);
});

router.get('/findEvent', (req, res) => {
    if (req.isAuthenticated() === false) {
        res.redirect('login');
    }
    res.render('findEvent');
});

router.get('/findById', (req, res) => {
    if (req.isAuthenticated() === false) {
        res.redirect('login');
    }
    res.render('findById');
});


router.post('/findEvent', async (req, res) => {


    for (var x in req.body) {
        if (req.body[x] === '') {
            //console.log(x);
            delete req.body[x];
        }
    }
    //console.log(req.body);

    await Event.find(req.body, (err, data) => {
        if (err) {
            console.log(err);
            res.redirect('findEvent');
        }
        else {
            console.log(data);
            res.render('eventResult', { participants: data });
        }
    });
});

router.post('/findById', async (req, res) => {


    for (var x in req.body) {
        if (req.body[x] === '') {
            //console.log(x);
            delete req.body[x];
        }
    }
    //console.log(req.body);

    await Registration.find(req.body, (err, data) => {
        if (err) {
            console.log(err);
            res.redirect('findById');
        }
        else {
            console.log(data);
            res.render('findByIdResult', { participants: data });
        }
    });
});

module.exports = router;