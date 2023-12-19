const nodemailer = require('nodemailer');
const VerifyEmailTem = require('../config/VerifyEmailTem');

// verification email send
const sendVerificationEmail = async (user) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_SERVICE,
        pass: process.env.PASSWORD_SERVICE,
      },
    });
    const mailOptions = {
      to: user.email,
      from: '"Custom Auth MERN" <nodestore.1100@gmail.com>',
      subject: 'Verification Code',
      html: VerifyEmailTem.replace('${verifyOTP}', user.verifyOTP),
    };

    await transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Error sending email:', err);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error;
  }
};

module.exports = sendVerificationEmail;
