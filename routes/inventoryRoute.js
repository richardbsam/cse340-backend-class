// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/index") // Error-handling utility
const { body } = require("express-validator");


// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId))

// Route to display the inventory item detail view based on the inventory ID
router.get("/detail/:invId", utilities.handleErrors(invController.buildVehicleDetail))

// Route to render the inventory management view
router.get("/", utilities.handleErrors(invController.buildManagementView))

// Route to add a new classification (Task 2)
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassificationView));




// Route to process the add-classification form with validation
router.post(
  "/add-classification",
  [
    body('classification_name')
      .matches(/^[a-zA-Z0-9]+$/)
      .withMessage('Classification name cannot contain spaces or special characters.')
      .trim() // Removes extra whitespace from input
      .escape() // Escape special characters like <, >, &, etc.
  ],
  utilities.handleErrors(invController.processAddClassification)
);

// Route to add a new inventory item (Task 3)
// Route to render the Add Inventory view
router.get("/add-inventory", utilities.handleErrors(invController.buildAddInventoryView));

// Route to handle form submission and add a new vehicle
router.post("/add-inventory", utilities.handleErrors(invController.addNewVehicle));

// Intentional Error Route for Task 3
router.get("/trigger-error", utilities.handleErrors(async (req, res, next) => {
  throw new Error('Intentional server error triggered for testing!');
}));



module.exports = router;
