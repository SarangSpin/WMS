const otpGenerator = require("otp-generator");
const expressAsyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");


const generateOTP = () => {
  const OTP = otpGenerator.generate(4, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  return OTP;
};



const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'bernice.skiles80@ethereal.email',
      pass: 'wFCeqFD79DF7dZY8y8'
  }
});

  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  const sendEmail = expressAsyncHandler(async (email, otp) => {
    
    console.log(email);
  
    var mailOptions = {
      from: `bernice.skiles80@ethereal.email`,
      to: email,
      subject: "OTP for verifying your account",
      text: `Your OTP is: ${otp}`,
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return(false)
      } else {
        console.log("Email sent successfully!");
        return(true)
      }
    });
  });
  
  module.exports = {sendEmail, generateOTP};