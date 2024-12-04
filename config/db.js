const mongoose = require('mongoose');

const initiateDBConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION_URI);  // Simplified connection
        console.log('Connected to MongoDB Server.');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);  // Exit process with failure
    }
};

module.exports = initiateDBConnection;
