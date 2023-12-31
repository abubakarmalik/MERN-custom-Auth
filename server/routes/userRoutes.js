const express = require('express');
const router = express.Router();
const {
  signinUser,
  signupUser,
  handleVerification,
  resendOTPVerify,
  resendOTPForget,
  forgetPass,
  resetPassword,
} = require('../controllers/userController');

router.post('/signin', signinUser);
router.post('/signup', signupUser);
router.post('/verifyotp', handleVerification);
router.get('/resendotp', resendOTPVerify);
router.post('/resendotp', resendOTPForget);
router.post('/forget', forgetPass);
router.post('/reset', resetPassword);

module.exports = router;
