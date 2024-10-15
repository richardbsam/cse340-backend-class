// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to display the inventory item detail view based on the inventory ID
router.get("/detail/:invId", invController.buildVehicleDetail);

module.exports = router;
