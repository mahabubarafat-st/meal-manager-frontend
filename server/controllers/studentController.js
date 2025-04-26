const Student = require('../models/Student');
const TokenTransaction = require('../models/TokenTransaction');
const MealHistory = require('../models/MealHistory');

// GET /api/students/:id/home
exports.getStudentHome = async (req, res) => {
  try {
    const student = await Student.findOne({ cuetId: req.params.id });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    const transactions = await TokenTransaction.find({ student: student._id })
      .sort({ createdAt: -1 })
      .limit(5);

    // Calculate stats
    const week = await TokenTransaction.countDocuments({ student: student._id, date: { $gte: new Date(Date.now() - 7*24*60*60*1000) } });
    const month = await TokenTransaction.countDocuments({ student: student._id, date: { $gte: new Date(Date.now() - 30*24*60*60*1000) } });
    const totalSpent = await TokenTransaction.aggregate([
      { $match: { student: student._id, type: 'deduct' } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    // Favorite meal calculation
    const mealCounts = await TokenTransaction.aggregate([
      { $match: { student: student._id, meal: { $exists: true, $ne: null } } },
      { $group: { _id: "$meal", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]);
    const favoriteMeal = mealCounts[0]?._id || null;
    // Last recharge
    const lastRechargeTx = await TokenTransaction.findOne({ student: student._id, type: 'charge' }).sort({ date: -1 });
    const lastRecharge = lastRechargeTx ? lastRechargeTx.date : null;

    // Get meal history from MealHistory collection
    const mealHistory = await MealHistory.find({ student: student._id })
      .sort({ date: -1 })
      .limit(10)
      .select('date meal amount');

    res.json({
      name: student.name,
      cuetId: student.cuetId,
      email: student.email,
      tokens: student.tokens,
      mealHistory,
      recentTransactions: transactions,
      stats: {
        week,
        month,
        favoriteMeal,
        lastRecharge,
        totalSpent: totalSpent[0]?.total || 0,
        name: student.name,
        cuetId: student.cuetId,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
