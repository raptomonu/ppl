const router=require('express').Router();
const userApi = require('./api')
const upload=require('./multer')
const jwt = require('jsonwebtoken')
const imageSchema=require('./schema/imageschema')
const categorySchema=require('./schema/categoryschema')
const decode =require('jwt-decode')
router.post('/verifytoken',verifyToken,(req,res)=>{
        
        // console.log("token in router>>>>>>>>>>>>",req.headers) 
        jwt.verify(req.token,'monukumar',(err,authData)=>{
                if(err){
                        console.log("errr")
                        // console.log(err.stack)
                        res.send(err)
                }
                else{
                        // console.log("Authorized data >>>>>>>>>>>>>>>>>>>>>>>>",authData)
                       console.log("token verified") 
                        res.json({done:true,name:authData.result.username})
                       
                }

        })
        // let checktoken= userApi.checktoken(req.body)
})

function verifyToken(req,res,next){
       
        const bearerHeader = req.headers['authorization'];
        console.log("thsi is auth",bearerHeader)

  if(typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
     
    req.token = bearerToken;
    next();
  } else {
   
    res.sendStatus(403);
  }
       
}

router.post('/singlepost',(req,res)=>{
        imageSchema.findOne({_id:req.body.id}).then((data)=>{
                // console.log(data)
                res.send(data)
        })
        // console.log("this is id from single post",req.body )

})

router.post('/postload',(req,res)=>{
        imageSchema.find({}).then((result)=>{
                
                res.send(result)
        })
})

router.post('/categoryload',(req,res)=>{
        categorySchema.find({}).then((result)=>{        
                res.send(result)
        })
})

router.post('/signup',async (req,res)=>{
        let checkData=await userApi.checkmail(req.body.mail)
        // console.log("checkdata===========>",checkData)          
        let datafromApi = await userApi.adduser(req.body)
        console.log("last output",datafromApi)
        res.send(datafromApi.message)
        // res.send({code:200,message:checkData.data})
});




router.post('/login',async (req,res)=>{
        let checklogin=await userApi.userlogin(req.body.mail,req.body.password)
        console.log("router result",checklogin)
        // res.send(checklogin.message)
        if(checklogin.message){
                res.send(checklogin.message)
        }
        else{

                res.json({token:checklogin})
        }
        

});




router.post('/uploadimage',upload.single("data"),async (req,res)=>{
        // console.log("this is uplaod image router",req.file)
        // console.log("this is upload image token>>>>>>>>>>.",req.file)
        // let token=req.file.token;
        // let decoded=decode(token)
        // console.log("decode token upload image >>>>>>>>>>",decode(req.body.token)) 
        let decoded=decode(req.body.token)
        // console.log("decoded",decoded.result.username)
        req.body.imagename=req.file.originalname;
        req.body.username=decoded.result.username;
        req.body.id=decoded.result._id;
        
        const time=new Date();
        req.body.date=time.toLocaleDateString();
        req.body.time=time.toLocaleTimeString();

        let saveimage=await userApi.imagedetail(req.body);
        // console.log("data saved=>>>>>",saveimage)
        imageSchema.find({}).then((result)=>{
                // console.log("schema====",result)
                res.send(result)
        })
        // res.send(saveimage)
})


router.post('/uploadcategory',upload.single("data"),async (req,res)=>{
        // console.log(req.file)
        req.body.imagename=req.file.originalname
        // console.log(req.body)
        const categorysave=await userApi.categorysave(req.body);
        // console.log(categorysave)
        // res.send(categorysave)
        categorySchema.find({}).then((result)=>{
                res.send(result)
        })
        
})

module.exports  = router;