// Import required modules
const express = require('express');
const router = express.Router();
const utilities = require('../utilities/'); // Assuming utilities/index.js is the file location
const accountController = require('../controllers/accountController'); // Controller to handle account actions

// Define a GET route for the login page
router.get('/login', utilities.handleErrors(accountController.buildLogin));


// Error handling middleware for any issues in account-related routes
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong. Please try again later.');
});

// Export the router for use in server.js
module.exports = router;
