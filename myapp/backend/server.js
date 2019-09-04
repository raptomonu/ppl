const express=require('express');
const app=express();
const router=require('./router');
const mongoose=require('mongoose');
const multer=require('multer');
mongoose.set('useCreateIndex',true)
const cors= require('cors');
const parser= require('body-parser');
app.use(express.static('upload'))
app.use(parser.urlencoded({ extended:false}))
app.use(parser.json())
app.use(cors());
app.use("/",router)


mongoose.connect('mongodb://127.0.0.1/userdb',{useNewUrlParser:true});
const database=mongoose.connection;
database.on('open',()=>{
console.log("database connected")
});

//file upload


app.listen(8080,()=>{
    console.log("server runing on port 3000")
})