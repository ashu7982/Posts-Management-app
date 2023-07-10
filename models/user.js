

const mongoose = require('mongoose');

// defining our schema for user.

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  city: { type: String, required: true },
  age: { type: Number, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;