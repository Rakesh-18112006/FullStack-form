const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 15
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 20
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  dob: {
    type: Date,
    required: true
  },
  idNumber: {
    type: String,
    required: true,
    match: [/^[0-9]+$/, 'ID number must contain only digits']
  },
  branchName: {
    type: String,
    required: true,
    enum: ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Business Administration']
  },
  interestedDomain: {
    type: String,
    required: true,
    enum: ['Web Development', 'Mobile Development', 'Data Science', 'Artificial Intelligence', 'Cloud Computing', 'Cybersecurity']
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);