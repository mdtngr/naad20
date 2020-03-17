const express = require('express');
const flash = require('express-flash');
const session = require('express-session');
const partials = require('express-partials');
const passport = require("passport");
const localStrategy = require("passport-local");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const server = require('http').createServer(app);
const cors = require('cors');
const registrationRoutes = require('./routes/registration');
const adminRoutes = require('./routes/admin');
const indexRoutes = require('./routes/index');
const Admin = require('./models/admin');
const MongoStore = require('connect-mongo')(session);


var result = require('dotenv').config();

if (result.error) {
    throw result.error;
}

const mongoDBURI = process.env.MONGODB_URI;
//console.log(process.env);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
mongoose.connect(mongoDBURI, () => {
    console.log("connected to DB");
});

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");



const expressSession = require('express-session');
const sessionMiddleware = expressSession({
    secret: process.env.secretKey,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 4320000 }, // 12 Hrs
    store: new MongoStore({
        url: mongoDBURI,
        autoReconnect: true,
    })
});
app.use(sessionMiddleware);

app.use(flash());
app.use(cors());
app.use(partials());
//mongoose.set('debug', true)


app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(Admin.authenticate()));
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

app.use('/api', registrationRoutes);
app.use('/api/admin/', adminRoutes);
app.use('/api/feed',indexRoutes);





const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
