const mongoose=require('mongoose');
const schema=mongoose.Schema({
imagename:{type:String},
title:{type:String},
category:{type:String},
date:{type:String},
time:{type:String},
id:{type:String},
username:{type:String},
likedby:{type:Array,unique:false},
comment:{type:Array}

})
module.exports=mongoose.model('imagecollections',schema)