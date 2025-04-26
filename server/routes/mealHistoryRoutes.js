const express = require('express');
const router = express.Router();
const {
  takeAMeal,
  getAllMealHistories,
  getMealHistoriesByStudent,
  updateMealHistory,
  deleteMealHistory
} = require('../controllers/mealHistoryController');
const { authenticate, authorizeRoles } = require('../middleware/auth');

// Create meal history
router.post('/', authenticate, authorizeRoles('admin', 'provost', 'student'), takeAMeal);
// Get meal histories by student
router.get('/student/:studentId', authenticate, getMealHistoriesByStudent);
// Get all meal histories
router.get('/', authenticate, authorizeRoles('admin', 'provost','student'), getAllMealHistories);
// Update meal history
router.put('/:id', authenticate, authorizeRoles('admin', 'provost', 'student'), updateMealHistory);
// Delete meal history
router.delete('/:id', authenticate, authorizeRoles('admin', 'provost', 'student'), deleteMealHistory);

module.exports = router;
