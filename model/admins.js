const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username:String,
    password:String
});

let admins = module.exports = mongoose.model('admins',adminSchema);