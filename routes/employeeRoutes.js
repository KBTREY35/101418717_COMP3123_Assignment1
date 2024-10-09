const express = require('express');
const Employee = require('../models/Employee');
const router = express.Router();

// Get all employees
router.get('/employees', async (req, res) => {
  const employees = await Employee.find();
  res.status(200).json(employees);
});

// Create new employee
router.post('/employees', async (req, res) => {
  const newEmployee = new Employee(req.body);
  await newEmployee.save();
  res.status(201).json({ message: "Employee created successfully.", employee_id: newEmployee._id });
});

// Get employee by ID
router.get('/employees/:eid', async (req, res) => {
  const employee = await Employee.findById(req.params.eid);
  if (!employee) return res.status(404).json({ message: "Employee not found" });
  res.status(200).json(employee);
});

// Update employee by ID
router.put('/employees/:eid', async (req, res) => {
  await Employee.findByIdAndUpdate(req.params.eid, req.body);
  res.status(200).json({ message: "Employee updated successfully." });
});

// Delete employee by ID
router.delete('/employees', async (req, res) => {
  await Employee.findByIdAndDelete(req.query.eid);
  res.status(204).json({ message: "Employee deleted successfully." });
});

module.exports = router;
