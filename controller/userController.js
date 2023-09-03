const userModel = require('../models/userModels');

module.exports.getUser = async function getUser(req,res,next) {
    // res.sendFile("./views/index.html", {root : __dirname});
    let id = req.params.id;  
    // console.log(id);
    let user = await userModel.findById(id);
    if(user){
        console.log("check 2");
        res.json(user);
    }else{
        res.json({ 
            message : "User not found",
        });
    }
}

module.exports.updateUser =async function updateUser(req,res) {
    // console.log("req.body -> ", req.body);
    // Update data in users object
    try {
        let id = req.params.id;
        let user = await userModel.findById(id);
        let dataToBeUpdated = req.body; 
    
        if(user){
            let keys = [];
            for(let key in dataToBeUpdated){
                keys.push(key);
            }
    
            for(let i=0; i<keys.length; i++){
                user[keys[i]] = dataToBeUpdated[keys[i]];
            }
            const updatedData = await user.save();
            res.json({
                message : "Data updated successfully",
                data  : user
            });
        }else {
            res.json({
                message : 'User not Found',
            })
        }
    } catch (error) {
        res.json({
            message : error.message,
        })
    }

}

module.exports.deleteUser = async function deleteUser(req,res) {
    try {
        let id = req.params.id;
        let user = await userModel.findByIdAndDelete(id);
        if(!user){
            res.json({
                message : "User not found"
            })
        }
        res.json({
            message: "Data deleted successfully",
            data : user
        });
        
    } catch (error) {
        res.json({
            message : error.message
        })
    }
}

module.exports.getAllUser = async function getAllUser(req, res){
    try {
        let users = await userModel.find();
        if(users){
            res.json({
                message : " Users Data retrieved",
                data : users
            })
        }else{
            res.json({
                message : "No users Found"
            })
        }
    } catch (error) {
        res.json({
            message : error.message
        })
    }
}

module.exports.updateProfileImage = function updateProfileImage(req,res){
    res.json({
        message : "file uploaded successfully"
    });
}

module.exports.forgetPassword = async function forgetPassword(req,res){
    let {email} = req.body;
    try {
        let user = await userModel.findOne({email : email});
        if(user){
            const resetToken = user.createResetToken();
            let resetPasswordLink = `${req.protocol}://${req.get('host')}/resetpassword/${resetToken}`;
            //send email to the user
            //nodemailer
        }else{
            return res.json({
                message : 'user not exist'
            })
        }
    } catch (error) {
        res.json({
            message : error.message
        })
    }
}

//reset password
module.exports.resetPassword = async function resetPassword(req,res){
    try {
        const token = req.params.token;
        let {password, confirmPassword} = req.body;
        const user = await userModel.findOne({resetToken : token});
        if(user){
            //resetPasswordHandler will update user's db
            user.resetPasswordHandler(password,confirmPassword);
            await user.save();
            res.json({
                message : "Password changed successfully, Login again"
            })
        }else{
            res.json({
                message : "User doesn't exist"
            });
        }
    } catch (error) {
        res.json({
            message : error.message
        })
    }
}
// function setCookies(req,res){
//     // res.setHeader('Set-Cookie', 'isLoggedIn=true');
//     res.cookie('isLoggedIn', true, {maxAge: 1000*60*60*24, secure:true, httpOnly : true});
 //     res.send('cookies has been set');
// }

// function getCookies(req,res){
//     let cookies = req.cookies;
//     console.log(cookies);
//     res.send("Cookies received");
// }
