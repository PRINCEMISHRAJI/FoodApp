const express = require('express');
const authRouter = express.Router();
const userModel = require('../models/userModels');
const jwt = require("jsonwebtoken");
const JWT_KEY = require('../secrets');

// authRouter
// .route("/signup")
// .get(getSignup)

// // authRouter
// // .route("/login")
// // .post(login)

function getSignup(req,res){
    res.sendFile('index.html', {root: './public'});
}

async function login(req,res){    
    try {
        let data = req.body;
        if(data.email){

            let user = await userModel.findOne({email:data.email});
            if(user){
                if(user.password == data.password){
                    let uid = user['_id']; //uid
                    let token = jwt.sign({payload : uid}, JWT_KEY);
                    res.cookie('login',token, {httpOnly : true});
                    return res.json({
                    message :"User has logged in",
                    userDetails : data
                })
            }
            else{
                return res.json({
                    message : "User not found"
                })
            }
        }else{
            return res.json({
                message : "Empty field found" 
            }) 
        }
    }
        
    } catch (error) {
        // return res.stausCode(500).json({
        //     message : error.message
        // })
    }
}

module.exports = authRouter;