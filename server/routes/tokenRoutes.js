const express = require('express');
const router = express.Router();
const { chargeTokens } = require('../controllers/tokenController');
const { authenticate, authorizeRoles } = require('../middleware/auth');

// POST /api/tokens/charge
// Only admin or provost can charge tokens
router.post('/charge', authenticate, authorizeRoles('admin', 'provost'), chargeTokens);

module.exports = router;
