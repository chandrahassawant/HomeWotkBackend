const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Student = require('./models/student'); // Import the Student model
const Teacher = require('./models/teacher');

mongoose.connect('mongodb://localhost:27017/homework', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const server = express();
server.use(cors());
server.use(express.json());

//--------------------------student register backend start-----------------------------
server.post('/api/register/student', async (req, res) => {
  const formData = req.body;

  try {
    // Validate className and parentOccupation against their respective enums defined in the Student model
    if (!Student.schema.path('className').enumValues.includes(formData.className)) {
      throw new Error('Invalid className value');
    }
    if (!Student.schema.path('parentOccupation').enumValues.includes(formData.parentOccupation)) {
      throw new Error('Invalid parentOccupation value');
    }

    // Create a new student instance based on the Mongoose model
    const newStudent = new Student(formData);

    // Save the new student to the database
    await newStudent.save();

    console.log('Student registration saved successfully');
    res.status(200).json({ message: 'Student registered successfully!' });
  } catch (error) {
    console.error('Error saving student registration:', error);
    res.status(400).json({ error: error.message });
  }
});
//--------------------------student register backend end-----------------------------



//--------------------------teacher register backend start-----------------------------
server.post('/api/register/teacher', async (req, res) => {
  const formData = req.body;

  try {
    // Validate className and parentOccupation against their respective enums defined in the Student model
    if (!Teacher.schema.path('schoolName').enumValues.includes(formData.schoolName)) {
      throw new Error('Invalid schoolName value');
    }
    if (!Teacher.schema.path('className').enumValues.includes(formData.className)) {
      throw new Error('Invalid className value');
    }

    // Create a new student instance based on the Mongoose model
    const newTeacher = new Teacher(formData);

    // Save the new student to the database
    await newTeacher.save();

    console.log('Teacher registration saved successfully');
    res.status(200).json({ message: 'Teacher registered successfully!' });
  } catch (error) {
    console.error('Error saving teacher registration:', error);
    res.status(400).json({ error: error.message });
  }
});
//--------------------------teacher register backend end-----------------------------



const port = 3100;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
