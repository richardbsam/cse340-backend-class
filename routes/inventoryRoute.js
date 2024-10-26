// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/index") // Error-handling utility

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId))

// Route to display the inventory item detail view based on the inventory ID
router.get("/detail/:invId", utilities.handleErrors(invController.buildVehicleDetail))

// Route to render the inventory management view
router.get("/management", utilities.handleErrors(invController.buildManagementView))





// Route to add a new classification (Task 2)
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassificationView));
router.post("/add-classification", utilities.handleErrors(invController.addNewClassification));

// Route to add a new inventory item (Task 3)
router.get("/add-inventory", utilities.handleErrors(invController.addInventoryView));





// Intentional Error Route for Task 3
router.get("/trigger-error", utilities.handleErrors(async (req, res, next) => {
    throw new Error('Intentional server error triggered for testing!');
  }));



module.exports = router;
