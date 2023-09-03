const express = require('express');
const userRouter = express.Router(); // mini app
const {getUser, getAllUser, updateUser, deleteUser, forgetPassword, 
    resetPassword,
    updateProfileImage} = require('../controller/userController');
const {signup, login, isAuthorized, protectRoute, logout} = require('../controller/authController');
const multer = require('multer');
//user options
userRouter.route('/:id')
.patch(updateUser)
.delete(deleteUser)

userRouter
.route('/signup')
.post(signup)

userRouter
.route('/login')
.post(login)

//Multer for file upload
// upload -> Storage, data->filter
const multerStorage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null, "public/images")
    },
    filename : function(req,file,cb){
        cb(null, `user-${Date.now()}.jpeg`);
    }
});
const filter = function(req,file,cb){
    if(file.mimetype.startsWith("image")){
        cb(null,true)
    }else{
        cb(new Error("Not an Image! Upload an image"), false);
    }
}
const upload = multer({
    storage : multerStorage,
    fileFilter : filter
})

// Profile page
// userRouter.use(protectRoute);
userRouter
.route('/userProfile')
.get(getUser)

userRouter.post("/ProfileImage",upload.single("photo"), updateProfileImage);
userRouter.get("/ProfileImage", (req,res)=> {
    res.sendFile("C:/Users/Prince/Desktop/Debouncing/multer.html");
})

// admin specific function
userRouter.use(isAuthorized(['admin']));
userRouter.route('/')
.get(getAllUser)

userRouter
.route('/forgetPassword')
.post(forgetPassword)

userRouter
.route('/resetPassword/:token')
.post(resetPassword)

userRouter
.route('/logout')
.get(logout)

module.exports = userRouter;
