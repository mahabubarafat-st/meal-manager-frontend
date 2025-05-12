const MealHistory = require('../models/MealHistory');

// TAKE a meal (refined createMealHistory)
exports.takeAMeal = async (req, res) => {
  try {
    const { cuetId, meal } = req.body;
    if (!cuetId || !meal) {
      return res.status(400).json({errorType:'warning', message: 'cuetId and meal are required' });
    }
    // Use server time for meal entry
    const mealDate = new Date();
    // Find student by cuetId
    const Student = require('../models/Student');
    const studentDoc = await Student.findOne({ cuetId });
    if (!studentDoc) return res.status(404).json({ errorType:'warning', message: 'Student not found' });
    // Check last meal entry for this student
    const lastMeal = await MealHistory.findOne({ student: studentDoc._id }).sort({ date: -1 });
    if (lastMeal) {
      const lastTime = new Date(lastMeal.date).getTime();
      const now = mealDate.getTime();
      const diffHours = Math.abs(now - lastTime) / (1000 * 60 * 60);
      if (diffHours < 6) {
        return res.status(400).json({errorType:'warning', message: 'You can only take a meal every 6 hours.' });
      }
    }
    if (studentDoc.tokens <= 0) {
      return res.status(400).json({ errorType:'danger',message: 'Not enough tokens to take a meal.' });
    }
    studentDoc.tokens -= 1;
    await studentDoc.save();
    // Create meal history entry with server date
    const mealHistory = await MealHistory.create({ student: studentDoc._id, cuetId, date: mealDate, meal });
    // Populate student info (excluding sensitive fields)
    const populatedMeal = await MealHistory.findById(mealHistory._id).populate('student', '-pin -__v -createdAt -updatedAt');
    // Flatten the response: send all meal fields at root, and student as student object
    const flatMeal = {
      ...populatedMeal.toObject(),
      student: populatedMeal.student
    };
    res.status(201).json(flatMeal);
  } catch (err) {
    res.status(500).json({errorType:'danger', message: 'Server error', error: err.message });
  }
};

// READ all meal histories
exports.getAllMealHistories = async (req, res) => {
  try {
    const histories = await MealHistory.find().populate('student', 'name cuetId');
    res.json(histories);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// READ meal histories by studentId
exports.getMealHistoriesByStudent = async (req, res) => {
  try {
    const histories = await MealHistory.find({ student: req.params.studentId }).populate('student', 'name cuetId');
    res.json(histories);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// UPDATE meal history
exports.updateMealHistory = async (req, res) => {
  try {
    const { date, meal } = req.body;
    const updated = await MealHistory.findByIdAndUpdate(
      req.params.id,
      { date, meal },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Meal history not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// DELETE meal history
exports.deleteMealHistory = async (req, res) => {
  try {
    const deleted = await MealHistory.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Meal history not found' });
    res.json({ message: 'Meal history deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
