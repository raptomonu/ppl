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
                        // console.log("this is token when created",result)
                        res([token,result._id])
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
        // console.log("this is imagedetail api here",data)
        return new Promise((res,rej)=>{
            imageSchema.create(data ,(err,result)=>{
                console.log(result)
                if(err){
                    console.log("error in image detail api?>>>>>>>")
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
    },
    commentdata:(data)=>{
        return new Promise((res,rej)=>{
            // console.log(data)
            userSchema.findOne({_id:data.id},{username:1,_id:0}).then((result)=>{
                console.log(data.text)
                imageSchema.updateOne({_id:data.imageid},{$push:{comment:{username:result.username,text:data.text}}}).then((final)=>{
                    res(final)
                })

            })
            
        })
    }

}