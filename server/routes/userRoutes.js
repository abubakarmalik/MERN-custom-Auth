const express = require('express');
const router = express.Router();
const {
  signinUser,
  signupUser,
  handleVerification,
} = require('../controllers/userController');

//signin
router.post('/signin', signinUser);

//signup
router.post('/signup', signupUser);

router.post('/verifyotp', handleVerification);

module.exports = router;
