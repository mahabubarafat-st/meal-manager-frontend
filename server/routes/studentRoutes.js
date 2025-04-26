const express = require('express');
const router = express.Router();
const { getStudentHome } = require('../controllers/studentController');

// GET /api/students/:id/home
router.get('/:id/home', getStudentHome);

module.exports = router;
