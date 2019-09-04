const mongoose = require('mongoose');
const validator = require("mongoose-unique-validator");

const schema = mongoose.Schema({
    username:{type:String,require:true},
    mail:{type:String,require:true,unique:true},
    password:{type:String,require:true,minLength:6},
    firstname:{type:String,require:true},
    lastname:{type:String,require:true}
});
schema.plugin(validator);
module.exports = mongoose.model('usercollections', schema);
