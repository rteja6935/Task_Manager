const express = require('express');
const userApi = express.Router();
const expressAsyncHandler = require('express-async-handler');
const bcryptjs = require('bcryptjs');
const jwt=require('jsonwebtoken');
userApi.use(express.json());


userApi.post('/login',expressAsyncHandler(async(req,res)=>{
    try {
    let LoginCollection = req.app.get("LoginCollection");
    let credentials = req.body;
    

    let dbusername = await LoginCollection.findOne({username:credentials.username});
    console.log("credentials",dbusername);
    if(!dbusername){
        res.send({message:"invalid username"});
    }
    else{
        let result = await bcryptjs.compare(credentials.password,dbusername.password);
        if(result==false){
            res.send({message:"invalid password"});            
        }
        else{
            console.log("credentials",credentials); 
            let token = jwt.sign({username:dbusername.username},'abcdef',{expiresIn:'1d'});
            res.send({message:"login success",token:token,user:dbusername});
        }
        
    }

  } catch (err) {
    res.status(500).send({ message: "Error fetching data", error: err.message });
  }
}));

userApi.post('/register',expressAsyncHandler(async(req,res)=>{
    let LoginCollection=req.app.get("LoginCollection");
    let newUser=req.body;
    console.log("newUser",newUser);
    let user=await LoginCollection.findOne({username:newUser.username});
    if(user!=null){
        res.send({message:"already username exists"});
    } 
    else{
        let password= await bcryptjs.hash(newUser.password,6);
        newUser.password=password;
        
        await LoginCollection.insertOne(newUser);
        res.send({message:"user registered successfully"});
    }
}));

module.exports = userApi;