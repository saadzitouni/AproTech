const mongoose = require('mongoose');

const coursesSchema = new mongoose.Schema({
    name:String,
    code:String,
    teacher:String,
    url:String,
    describtion:String,
    duree:String
});

let courses = module.exports = mongoose.model('courses',coursesSchema);