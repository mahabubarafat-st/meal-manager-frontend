const express = require('express');
const router = express.Router();
const {
  chargeTokens,
  createTransaction,
  getAllTransactions,
  getTransactionsByStudent,
  updateTransaction,
  deleteTransaction
} = require('../controllers/tokenController');
const { authenticate, authorizeRoles } = require('../middleware/auth');

// POST /api/tokens/charge
// Only admin or provost can charge tokens
router.post('/charge', authenticate, authorizeRoles('student','admin', 'provost'), chargeTokens);
router.get('/transactions/student/:studentId', authenticate, getTransactionsByStudent);
router.get('/transactions', authenticate, authorizeRoles('student','admin', 'provost'), getAllTransactions);

// as students will not be able to modify these things
router.post('/transactions', authenticate, authorizeRoles('admin', 'provost'), createTransaction);
router.put('/transactions/:id', authenticate, authorizeRoles('admin', 'provost'), updateTransaction);
router.delete('/transactions/:id', authenticate, authorizeRoles('admin', 'provost'), deleteTransaction);

module.exports = router;
