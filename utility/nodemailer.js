"use strict";
const nodemailer = require("nodemailer");

module.exports.sendMail = async function sendMail(str, data){
  const transporter = nodemailer.createTransport({  
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: 'tuhkonchirkut@gmail.com',
      pass: 'feeuvenegmejrqzj'
    }
  });
   
  // async..await is not allowed in global scope, must use a wrapper
    // send mail with defined transport object
    var Ohtml, Osubject ;
    if(str == "signup"){
      Osubject = `Thanks for signing up ${data.name}`,
      Ohtml = `
      <h1>Welcome to FoodApp.com </h1>
      Hope you have a good time
      Here are your details -
      Name - ${data.name}
      Email - ${data.email}
      `
    }else if(str == "resetPassword"){
      Osubject = 'Reset Password',
      Ohtml = `
      <h1> FoodApp.com</h1>
      Here's your link to reset your password!
      ${data.resetPasswordLink}
      `
    }
    const info = await transporter.sendMail({
      from: '"FoodApp👻" <tuhkonchirkut@gmail.com>', // sender address
      to: data.email, // list of receivers
      subject: Osubject, // Subject line
      // text: "Hello world?", // plain text body
      html: Ohtml, // html body
    });
    
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
    //
    // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
    //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
    //       <https://github.com/forwardemail/preview-email>
    //
  }