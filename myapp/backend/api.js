const userSchema=require('./schema/signupschema');
const imageSchema=require('./schema/imageschema');
const categorySchema=require('./schema/categoryschema');
const jwt = require('jsonwebtoken');

module.exports={
    
    adduser:function(data){
        return new Promise((res,rej)=>{
            userSchema.create(data,(err,result)=>{
                if(err){
                    
                    res({message:"already register"})
                   
                }
                else{
                    res({message:"congratulation your account is created"})
                    console.log("in the api when created doc",result)
                }
            })
        })
    },

    checkmail:(data)=>{


        return new Promise((res,rej)=>{
            userSchema.find({"mail":data})
            .then((doc)=>{ 
                if(doc.length==0){
                    
                    res(doc)

                }
                else{
                    res(true)

                
                }
                
            })


            .catch((err)=>{
                rej(err)
            })
        })
    },
    userlogin:(mail,pass)=>{
        // let tokens;
        return new Promise((res,rej)=>{
            userSchema.findOne({mail:mail}).then((result)=>{
                if(result)
                {
   
                    if(result.password===pass){

                        
                        var token=jwt.sign({result},'monukumar')
                        res(token)
                    }
                    else{
                        res({message:"Wrong password!!!!!!!!!!"})
                    }
                    
                    res({message:"this is login block here we work with login pattern"})
                }
                else{
                    res({message:"Email not registered"})
                }
            }).then((err)=>{
                rej(err)
            })
        });

    },
    imagedetail:(data)=>{
        console.log("this is api here",data)
        return new Promise((res,rej)=>{
            imageSchema.create(data ,(err,result)=>{
                
                if(err){
                    rej(err)
                }
                else{
                    res(result)
                }
            })
        })
    },

    categorysave:(data)=>{
        // console.log(data)
        return new Promise((res,rej)=>{
            categorySchema.create(data,(err,result)=>{
                if(err){
                    rej(err)
                }
                else{
                    console.log(result)
                    res(result)
                }
            })
            
        })
    }

}