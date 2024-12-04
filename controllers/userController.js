const mongoose = require('mongoose'); // Import mongoose for ObjectId validation
const User = require('../models/User'); // Import User model
const jwt = require('jsonwebtoken'); // Import jwt for token generation
const { findAllUsers } = require('../services/userService'); // Import service for fetching users

// Controller method to get users
exports.getUsers = async (req, res) => {
    try {
        const users = await findAllUsers(); // Call the service to fetch users
        res.json({
            success: true,
            data: users,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch users',
            error: error.message,
        });
    }
};

// Signup controller
exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Create a new user
        const newUser = new User({ name, email, password, role });
        await newUser.save();

        // Generate a token
        const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(201).json({ message: 'User created successfully', token });
    } catch (error) {
        console.error('Error during user creation:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete user controller
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        // Attempt to delete user
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
