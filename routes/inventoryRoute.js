// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/index") // Error-handling utility

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId))

// Route to display the inventory item detail view based on the inventory ID
router.get("/detail/:invId", utilities.handleErrors(invController.buildVehicleDetail))


module.exports = router;
