const mongoose = require('mongoose'); // Import mongoose
const{Schema,model}=require('mongoose');
const bcrypt = require('bcrypt');

// Define the user schema
const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true, // Optional: Ensure email is stored in lowercase
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ['user', 'admin'], 
    default: 'user' 
  },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Hash password before saving user to database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10); // Hash password using bcrypt
    next();
  } catch (error) {
    next(error); // Pass error to the next middleware in case of failure
  }
});

// Check if entered password matches stored hashed password
userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password); // Compare hashed password with provided password
};

// Export the user model
module.exports = mongoose.model('User', userSchema);