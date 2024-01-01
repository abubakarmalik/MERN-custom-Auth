const nodemailer = require('nodemailer');
const ResetEmailTem = require('../config/ResetEmailTem');

// verification email send
const sendResetEmail = async (user) => {
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
      subject: 'Password Changed',
      html: ResetEmailTem.replace('${name}', user.name),
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

module.exports = sendResetEmail;
