const mongoose = require('mongoose');
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const db_link = 'mongodb+srv://admin:JeSCuF9YFVDpBGzZ@cluster0.mdimqbr.mongodb.net/';
mongoose.connect(db_link)
.then(function(db) {
    // console.log(db);
    console.log("db connected");
}).catch(function(err){
    console.log(err);
});

const userSchema = mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    email: {
        type : String,
        required : true,
        unique : true,
        validate : function(){
            return emailValidator.validate(this.email);
        } 
    },
    password : {
        type : String,
        required : true,
        minLength : 8
    },
    confirmPassword : {
        type : String,
        required : true,
        validate: function(){
            return this.confirmPassword == this.password;
        }
    },
    role: {
        type : String,
        enum : ['admin', 'user', 'restaurantOwner', 'deliveryBoy'],
        default : 'user'
    },
    profileImage : {
        type : String,
        default : 'img/users/default.jpeg'
    },
    resetToken : String
});

// Model
const userModel = mongoose.model('userModel', userSchema);
module.exports = userModel;

userSchema.pre('save', function(){
    this.confirmPassword = undefined;
});
console.log("checking");
userSchema.pre('save', async function(){
    let salt = await bcrypt.genSalt();
    let hashedString = await bcrypt.hash(this.password, salt);
    console.log(hashedString);
});

userSchema.methods.createResetToken = function(){
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.resetToken = resetToken;
    return resetToken;
}

userSchema.methods.resetPasswordHandler = function(password, confirmPassword){
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.resetToken = undefined;
}


// ( async function createUser(){
//     let user = {
//         name : "Ankit",
//         email : "abc@gmail.com",
//         password : "12345678",
//         confirmPassword : "12345678"
//     };
//     let data = await userModel.create(user);
//     console.log(data);
// }) ();

//Pre post hooks 
//before save event occurs in db 
// userSchema.pre('save', function(){
//     console.log("Pre saved ", this);
// });

//after save event occurs in db 
// userSchema.post('save', function(doc){
//     console.log("Post saved ", doc);
// });


// module.exports = userModels;