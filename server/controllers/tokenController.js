const Student = require('../models/Student');
const TokenTransaction = require('../models/TokenTransaction');

// POST /api/tokens/charge
exports.chargeTokens = async (req, res) => {
  try {
    const { studentId, amount } = req.body;
    if (!studentId || !amount) return res.status(400).json({ message: 'studentId and amount required' });
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    student.tokens += amount;
    await student.save();
    const transaction = new TokenTransaction({
      student: student._id,
      amount,
      type: 'charge',
    });
    await transaction.save();
    res.json({ message: 'Tokens charged', tokens: student.tokens });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
