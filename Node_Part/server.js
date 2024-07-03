// const express = require("express");
// const cors = require("cors");

// const app = express();

// var corsOptions = {
//   origin: "http://localhost:8081"
// };

// app.use(cors(corsOptions));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//   res.json({ message: "Welcome" });
// });

// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });










// server.js
const express = require('express');
const bodyParser = require('body-parser');
const dbOperations = require('./dbOperations');

const app = express();
const port = 3000; // You can change this to any port you prefer

app.use(bodyParser.json());

// CREATE (INSERT)
app.post('/employees', async (req, res) => {
  try {
    const newEmployee = req.body;
    await dbOperations.createEmployee(newEmployee);
    res.status(201).json({ message: 'Employee created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// READ (SELECT)
app.get('/employees', async (req, res) => {
  try {
    const employees = await dbOperations.getLoginDetails();
    res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// UPDATE (UPDATE)
app.put('/employees/:employeeID', async (req, res) => {
  try {
    const updatedEmployee = req.body;
    updatedEmployee.EmployeeID = req.params.employeeID;
    await dbOperations.updateEmployee(updatedEmployee);
    res.json({ message: 'Employee updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE (DELETE)
app.delete('/employees/:employeeID', async (req, res) => {
  try {
    const employeeID = req.params.employeeID;
    await dbOperations.deleteEmployee(employeeID);
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
