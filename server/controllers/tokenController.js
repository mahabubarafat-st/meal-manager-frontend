const Student = require('../models/Student');
const TokenTransaction = require('../models/TokenTransaction');

// POST /api/tokens/charge
//TODO use a transaction in future to maintain consistency
exports.chargeTokens = async (req, res) => {
  try {
    const { studentId, amount, account,paymentMethod } = req.body;
    if (!studentId || !amount) return res.status(400).json({ message: 'studentId and amount required' });
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    // later it will be a db call made to token plans table
    // for now we will use hardcoded values
    const amountToTokens = {
      2400: 60,
      1500: 30,
      1000: 20,
      800: 14
    };
    const numOfTokens = amountToTokens[amount];
    if (!numOfTokens) return res.status(400).json({ message: 'Invalid amount for token purchase' });
    student.tokens += numOfTokens;
    await student.save();
    const transaction = new TokenTransaction({
      student: student._id,
      amount,
      numOfTokens,
      type: 'charge',
      account,
      paymentMethod
    });
    await transaction.save();
    res.json({ message: 'Tokens charged', tokens: student.tokens });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// POST /api/transactions
exports.createTransaction = async (req, res) => {
  try {
    const { studentId, amount, type, meal, date } = req.body;
    if (!studentId || !amount || !type) {
      return res.status(400).json({ message: 'studentId, amount, and type are required' });
    }
    const transaction = await TokenTransaction.create({
      student: studentId,
      amount,
      type,
      meal,
      date: date ? new Date(date) : undefined,
    });
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /api/transactions
exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await TokenTransaction.find().populate('student', 'name cuetId');
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /api/transactions/student/:studentId
exports.getTransactionsByStudent = async (req, res) => {
  try {
    const transactions = await TokenTransaction.find({ student: req.params.studentId }).populate('student', 'name cuetId');
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// PUT /api/transactions/:id
exports.updateTransaction = async (req, res) => {
  try {
    const { amount, type, meal, date } = req.body;
    const transaction = await TokenTransaction.findByIdAndUpdate(
      req.params.id,
      { amount, type, meal, date },
      { new: true }
    );
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// DELETE /api/transactions/:id
exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await TokenTransaction.findByIdAndDelete(req.params.id);
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
    res.json({ message: 'Transaction deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}
