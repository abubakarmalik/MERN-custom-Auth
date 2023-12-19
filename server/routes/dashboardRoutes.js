const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const { getDashboard } = require('../controllers/dashboardController');

router.use(requireAuth);

//get dashboard
router.get('/dashboard', getDashboard);

module.exports = router;
