const { Router } = require('express');
const { signup, deleteUser, getUsers } = require('../controllers/userController'); // Import all required methods
const usersRouter = Router();

// Define the routes
usersRouter.get('/', getUsers); // Route to get all users
usersRouter.post('/signup', signup); // Signup route
usersRouter.delete('/:id', deleteUser); // Delete user route (Updated to remove `/users` prefix)

module.exports = usersRouter;
