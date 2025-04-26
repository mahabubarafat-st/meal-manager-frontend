const Student = require('../models/Student');
const TokenTransaction = require('../models/TokenTransaction');
const MealHistory = require('../models/MealHistory');

// GET /api/students/:id/home
exports.getStudentHome = async (req, res) => {
  try {
    const student = await Student.findOne({ cuetId: req.params.id });
    if (!student) return res.status(404).json({ message: 'Student not found' });

    // Get last 10 meal history entries
    const mealHistory = await MealHistory.find({ student: student._id })
      .sort({ date: -1 })
      .limit(10)
      .select('date meal amount');

    // Meals taken this week
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const week = await MealHistory.countDocuments({ student: student._id, date: { $gte: weekAgo } });

    // Meals taken this month
    const monthAgo = new Date();
    monthAgo.setDate(monthAgo.getDate() - 30);
    const month = await MealHistory.countDocuments({ student: student._id, date: { $gte: monthAgo } });

    // Last recharge (last token charge transaction)
    const lastRechargeTx = await TokenTransaction.findOne({ student: student._id, type: 'charge' }).sort({ date: -1 });
    const lastRecharge = lastRechargeTx ? lastRechargeTx.date : null;

    // Total spent (sum of all token transaction amounts)
    const totalSpentAgg = await TokenTransaction.aggregate([
      { $match: { student: student._id } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const totalSpent = totalSpentAgg[0]?.total || 0;

    // Last 6 transactions (transaction history)
    const transactionHistory = await TokenTransaction.find({ student: student._id })
      .sort({ date: -1 })
      .limit(6);

    res.json({
      name: student.name,
      cuetId: student.cuetId,
      email: student.email,
      tokens: student.tokens,
      mealHistory,
      stats: {
        week,
        month,
        lastRecharge,
        totalSpent,
        name: student.name,
        cuetId: student.cuetId,
      },
      transactionHistory,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
