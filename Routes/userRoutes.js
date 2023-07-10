


const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const auth = require('../middlewares/auth');

const router = express.Router();

// User registration
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, city, age } = req.body;

    // confirming that password should contain all of these.
    if (!/(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(password)) {
      return res.status(400).json({ error: 'Password requirements not met' });
    }

     // here we are hashing the password for safety.
    const hashedPassword = await bcrypt.hash(password, 10);

    // creating a new user
    const user = new User({ name, email, password: hashedPassword, city, age });
    await user.save();

    res.status(200).json({ msg: 'The new user has been registered', registeredUser: user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});





// route for user login.
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }


       // Checking the password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // here we are  generating the JWT token for authentication.
    const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '7m' });

    res.status(200).json({ msg: 'Login successful!', token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// route for user logout
router.get('/logout', auth, async (req, res) => {
    try {
      res.status(200).json({ msg: 'User has been logged out' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  module.exports = router;