const express = require('express');
const flash = require('express-flash');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const server = require('http').createServer(app);
const cors = require('cors');
const registrationRoutes = require('./routes/registration');


var result = require('dotenv').config();

if(result.error){
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

app.use(flash());
app.use(cors());

app.use(registrationRoutes);


const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
