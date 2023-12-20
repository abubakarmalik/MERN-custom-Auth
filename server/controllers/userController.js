const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const generateOTP = require('../services/generateOTP');
const formatDate = require('../services/formatDate');
const createToken = require('../services/createToken');
const sendVerificationEmail = require('../services/sendVerificationEmail');

//signup
const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    // generate OTP
    const otp = generateOTP(6);
    const otpExpiration = Date.now() + 2 * 60 * 1000; // 5 minutes in milliseconds

    // Hash password
    const hash = await bcrypt.hash(password, 10);
    // Create user
    const user = await User.create({
      name,
      email,
      password: hash,
      verifyOTP: otp,
      otpExpiration,
      createdAt: formatDate(),
      updatedAt: formatDate(),
    });

    // send a verification code
    await sendVerificationEmail(user);

    // set otp null after 5 minutes
    setTimeout(async () => {
      try {
        const latestUser = await User.findById(user._id);
        if (latestUser && latestUser.otpExpiration > Date.now()) {
          await User.findByIdAndUpdate(user._id, {
            $set: { verifyOTP: null, otpExpiration: null },
          });
        }
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }, 2 * 60 * 1000);

    // Respond with user details
    return res
      .status(200)
      .json({ message: 'Verify Your Email Address', name, email });
  } catch (error) {
    console.error('Error in signupUser:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const handleVerification = async (req, res) => {
  try {
    const otp = req.body.otp;
    const user = await User.findOne({ verifyOTP: otp });
    if (user) {
      await User.findByIdAndUpdate(user._id, {
        $set: { verifyOTP: null, otpExpiration: null, verify: true },
      });
      return res
        .status(200)
        .json({ message: 'Your Account has been verified' });
    } else {
      return res.status(404).json({ message: 'Invalid OTP' });
    }
  } catch (error) {
    console.error('Error in signupUser:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

//signin
const signinUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // find user
    const user = await User.findOne({ email });

    // if no user in db
    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    // if the account is not verified
    if (!user.verify) {
      return res.status(401).json({ message: 'Account not verifeid' });
    }

    // match hash password
    const match = await bcrypt.compare(password, user.password);

    // if password not match
    if (!match) {
      return res.status(404).json({ message: 'Invalid Credentials' });
    }
    //create a token
    const token = createToken(user._id);

    const authUser = {
      email: user.email,
      name: user.name,
      token: token,
    };

    // Respond with user details
    return res
      .status(200)
      .json({ message: 'User signin successfully', authUser });
  } catch (error) {
    console.error('Error in signinUser:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { signinUser, signupUser, handleVerification };
