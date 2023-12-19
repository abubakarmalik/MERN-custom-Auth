const getDashboard = (req, res) => {
  try {
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error in getDashboard:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

module.exports = { getDashboard };
