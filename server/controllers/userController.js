const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const generateOTP = require('../services/generateOTP');
const formatDate = require('../services/formatDate');
const createToken = require('../services/createToken');
const sendVerificationEmail = require('../services/sendVerificationEmail');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');

//signup
const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    const otp = generateOTP(6);
    const otpExpiration = Date.now() + 2 * 60 * 1000;

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hash,
      verifyOTP: otp,
      otpExpiration,
      createdAt: formatDate(),
      updatedAt: formatDate(),
    });
    const token = createToken(user._id);
    const authUser = {
      email,
      name,
      token,
    };

    await sendVerificationEmail(user);

    return res
      .status(200)
      .json({ message: 'Verify Your Email Address', authUser });
  } catch (error) {
    console.error('Error in signupUser:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const handleVerification = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const otp = req.body.otp;
    if (!authorization) {
      return res.status(401).json({
        authenticated: false,
        error: 'Authorization token required',
      });
    }
    const token = authorization.split(' ')[1];
    const decodedToken = jwt.decode(token, { complete: true });
    const userId =
      decodedToken && decodedToken.payload ? decodedToken.payload._id : null;
    const objectId = new ObjectId(userId);
    const user = await User.findOne({ _id: objectId });

    if (!user) {
      return res.status(404).json({ message: 'Invalid Request' });
    }

    if (user.verifyOTP != otp) {
      return res.status(401).json({ message: 'Invalid OTP' });
    }

    const currentTimestamp = Date.now();
    if (user.otpExpiration <= currentTimestamp) {
      return res.status(401).json({ message: 'Please Request new OTP' });
    }
    await User.findByIdAndUpdate(user._id, {
      $set: { verifyOTP: null, otpExpiration: null, verify: true },
    });
    return res.status(200).json({ message: 'Your Account has been verified' });
  } catch (error) {
    console.error('Error in signupUser:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// resend otp
const resendOTP = async (req, res) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Authorization token required' });
    }

    const token = authorization.split(' ')[1];
    const decodedToken = jwt.decode(token, { complete: true });
    const userId =
      decodedToken && decodedToken.payload ? decodedToken.payload._id : null;

    const objectId = new ObjectId(userId);
    const user = await User.findOne({ _id: objectId });

    const otp = generateOTP(6);
    const otpExpiration = Date.now() + 2 * 60 * 1000;

    await User.findByIdAndUpdate(user._id, {
      $set: { verifyOTP: otp, otpExpiration: otpExpiration },
    });

    const updatedUser = await User.findOne({ _id: objectId });

    await sendVerificationEmail(updatedUser);

    return res.status(200).json({ message: 'Verify Your Email Address' });
  } catch (error) {
    console.error('Error in resendOTP:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

//signin
const signinUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    if (!user.verify) {
      return res.status(401).json({ message: 'Account not verifeid' });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(404).json({ message: 'Invalid Credentials' });
    }

    const token = createToken(user._id);
    const authUser = {
      email: user.email,
      name: user.name,
      token: token,
    };

    return res
      .status(200)
      .json({ message: 'User signin successfully', authUser });
  } catch (error) {
    console.error('Error in signinUser:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { signinUser, signupUser, handleVerification, resendOTP };
