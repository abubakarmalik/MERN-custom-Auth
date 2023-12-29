const jwt = require('jsonwebtoken');

// create auth Token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRECT_KEY, {
    expiresIn: 1 * 24 * 60 * 30,
  });
};

module.exports = createToken;
