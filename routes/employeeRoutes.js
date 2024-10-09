const express = require('express');
const { body, param, validationResult } = require('express-validator');
const Employee = require('../models/Employee');
const router = express.Router();

// Create Employee
router.post('/employees', [
  body('first_name').not().isEmpty().withMessage('First name is required'),
  body('email').isEmail().withMessage('Email is required'),
  body('salary').isNumeric().withMessage('Salary must be a number')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const newEmployee = new Employee(req.body);
  await newEmployee.save();
  res.status(201).json({ message: "Employee created successfully.", employee_id: newEmployee._id });
});

// Get Employee by ID
router.get('/employees/:eid', [
  param('eid').isMongoId().withMessage('Invalid Employee ID')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const employee = await Employee.findById(req.params.eid);
  if (!employee) return res.status(404).json({ message: "Employee not found" });

  res.status(200).json(employee);
});

// Update Employee by ID
router.put('/employees/:eid', [
  param('eid').isMongoId().withMessage('Invalid Employee ID'),
  body('salary').optional().isNumeric().withMessage('Salary must be a number')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const employee = await Employee.findByIdAndUpdate(req.params.eid, req.body, { new: true });
  if (!employee) return res.status(404).json({ message: "Employee not found" });

  res.status(200).json({ message: "Employee updated successfully." });
});

// Delete Employee by ID
router.delete('/employees', [
  param('eid').isMongoId().withMessage('Invalid Employee ID')
], async (req, res) => {
  const employee = await Employee.findByIdAndDelete(req.query.eid);
  if (!employee) return res.status(404).json({ message: "Employee not found" });

  res.status(204).json({ message: "Employee deleted successfully." });
});

module.exports = router;
