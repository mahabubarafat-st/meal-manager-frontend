const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  tokens: { type: Number, default: 0 },
  pin: { type: String, required: true }, // hashed 6-digit pin
  role: { type: String, enum: ['student', 'admin', 'provost'], default: 'student' },
  lastRecharge: { type: Date },
  cuetId: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true},
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
