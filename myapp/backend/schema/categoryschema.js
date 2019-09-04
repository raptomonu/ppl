const mongoose=require('mongoose');
const validator = require("mongoose-unique-validator");

const schema=mongoose.Schema({
    categoryname:{type:String,unique:true},
    imagename:{type:String}
})

schema.plugin(validator);
module.exports=mongoose.model("categorycollections",schema)