const mongoose = require('mongoose');

const stdudentSchema = new mongoose.Schema({
    First_name:String,
    Last_name:String,
    Email:String,
    Phone:String,
    cours_id:String
});

let stdudent = module.exports = mongoose.model('stdudent',stdudentSchema);