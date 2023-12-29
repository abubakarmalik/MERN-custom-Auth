const User = require('../models/userModel');
const { ObjectId } = require('mongodb');

const getDashboard = async (req, res) => {
  try {
    const _id = req.user._id;
    const objectId = new ObjectId(_id);
    const user = await User.findOne({ _id: objectId });
    const { name, email } = user;
    res.status(200).json({ authenticated: true, user: { name, email } });
  } catch (error) {
    console.error('Error in getDashboard:', error);
    res
      .status(500)
      .json({ authenticated: false, error: 'Internal Server Error' });
  }
};

module.exports = { getDashboard };
