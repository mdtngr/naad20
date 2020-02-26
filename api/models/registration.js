const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
    name: String,
    id: Number,
    school: String,
    contact: Number,
    email:String,
    branch:String,
    gender:String,
    rollNo:String
});

module.exports = mongoose.model("registration", registrationSchema);