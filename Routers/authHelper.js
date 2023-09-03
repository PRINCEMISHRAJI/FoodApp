// const jwt = require("jsonwebtoken");
// const JWT_KEY = require('../secrets');

// // let flag = false;
// function protectRoute(req,res,next){
//     if(req.cookies.login){
//         let isVerified = jwt.verify(req.cookies.login, JWT_KEY);
//         if(isVerified){
//             next();
//         }else{
//             return res.json({
//                 message : 'user not verified'
//             });
//         }
//     }else{
//         return res.json({
//             message : "Operation not allowed"
//         });
//     }
// }

// module.exports = protectRoute;