const mongoose = require('mongoose');

const tokenTransactionSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['charge', 'deduct'], required: true },
  meal: { type: String }, // e.g., 'Lunch', 'Dinner', etc.
  date: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('TokenTransaction', tokenTransactionSchema);
