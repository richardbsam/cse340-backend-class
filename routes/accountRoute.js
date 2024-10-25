// Import required modules
const express = require("express");
const router = new express.Router();
const utilities = require("../utilities"); // Assuming utilities/index.js is the file location
const accountController = require("../controllers/accountController"); // Controller to handle account actions
const regValidate = require('../utilities/account-validation')


// Route to build login view
router.get("/login", utilities.handleErrors(accountController.buildLogin))

// Route to build registration view
router.get("/register", utilities.handleErrors(accountController.buildRegister))

// Process the registration data
router.post(
  "/register",
  regValidate.registationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
)

// Error handling middleware for any issues in account-related routes
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong. Please try again later.");
});

// Export the router for use in server.js
module.exports = router;
