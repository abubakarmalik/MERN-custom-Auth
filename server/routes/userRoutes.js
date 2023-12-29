const express = require('express');
const router = express.Router();
const {
  signinUser,
  signupUser,
  handleVerification,
  resendOTP,
} = require('../controllers/userController');

router.post('/signin', signinUser);
router.post('/signup', signupUser);
router.post('/verifyotp', handleVerification);
router.get('/resendotp', resendOTP);

module.exports = router;
