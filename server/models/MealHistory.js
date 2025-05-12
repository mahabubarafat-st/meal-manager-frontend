const mongoose = require('mongoose');

const mealHistorySchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  cuetId: { type: String, required: true },
  date: { type: Date, required: true },
  meal: { type: String, enum: ['LUNCH', 'DINNER','FEAST'], required: true }, 
}, { timestamps: true });

module.exports = mongoose.model('MealHistory', mealHistorySchema);
