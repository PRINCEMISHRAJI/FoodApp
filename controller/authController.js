const express = require('express');
const userModel = require('../models/userModels');
const jwt = require("jsonwebtoken");
const JWT_KEY = require('../secrets');
const {sendMail} = require('../utility/nodemailer');



module.exports.signup = async function signup(req,res){
    try {
        let dataObj = req.body;
        let user = await userModel.create(dataObj);
        sendMail('signup', user);
        console.log("Get signup called");
        // console.log("backend", user);
    
        res.json({
            message : "user signed up",
            data : user
        });
    } catch (error) {
        res.json({
            message : error.message
        })
    }
}

// Login user
module.exports.login = async function login(req,res){    
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
        return res.status(500).json({
            message : error.message,
        })
    }
}

// isAuthorized -> To check users role {user, admin, restaurantOwner, DeliveryBoy}
module.exports.isAuthorized = function isAuthorized(roles){
    return function(req,res,next){
        if(roles.includes(req.role) == true){
            next();
        }
        else{
            res.status(401).json({
                message : 'operation not allowed',
            });
        }
    }
}

module.exports.protectRoute = async function protectRoute(req,res,next){
    try {
        let token; 
        if(req.cookies.login){
            console.log(req.cookies);
            token = req.cookies.login;
            let payload = jwt.verify(token, JWT_KEY);
            if(payload){
                console.log('payload token ',payload);
                const user = await userModel.findById(payload.payload);
                // res.json(user);
                req.role = user.role;
                req.id = user.id;
                // console.log(user.id);
                next;
            }else{
                return res.json({
                    message : 'Login Again'
                });
            }
        }else{
            // Browser 
            const client = req.get('User-Agent');
            if(client.includes("Mozilla") == true){
                return res.redirect('/login');
            };
            //Postman
            res.json({
                message : "plz login"
            })
        }
    }catch (error) {
        return res.json({
            message : error.message
        });
        
    }
}

module.exports.logout = function logout(req,res){
    res.cookie('login', ' ', {maxAge : 1});
    res.json({
        message : "User logged out successfully",
    });
}