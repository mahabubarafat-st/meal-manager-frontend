const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  tokens: { type: Number, default: 0 },
  pin: { type: String, required: true }, // hashed 6-digit pin
  role: { type: String, enum: ['student', 'admin', 'provost'], default: 'student' },
  favoriteMeal: { type: String },
  lastRecharge: { type: Date },
  // add more fields as needed
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
