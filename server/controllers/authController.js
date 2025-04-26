const Student = require('../models/Student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { name, cuetId, email, pin, role, phone } = req.body;
    console.log(req.body);
    if (!/^[0-9]{6}$/.test(pin)) {
      return res.status(400).json({ message: 'PIN must be 6 digits' });
    }
    // Check for existing cuetId
    const existing = await Student.findOne({ cuetId });
    if (existing) return res.status(400).json({ message: 'CUET ID already registered' });
    const hashedPin = await bcrypt.hash(pin, 10);
    const student = await Student.create({ name, cuetId, email, pin: hashedPin, role, phoneNumber: phone });
    res.status(201).json({ message: 'Registration successful', student: { id: student._id, name, cuetId, email, role } });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { cuetId, pin } = req.body;
    const student = await Student.findOne({ cuetId });
    if (!student) return res.status(400).json({ message: 'Invalid credentials' });
    const match = await bcrypt.compare(pin, student.pin);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: student._id, role: student.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, student: { id: student._id, name: student.name, cuetId: student.cuetId, email: student.email, role: student.role } });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
