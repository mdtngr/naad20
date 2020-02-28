const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    id: Number,
    event:String,
    name: String,
    memberId: Array
});

module.exports = mongoose.model("event", eventSchema);