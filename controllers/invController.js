const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}




/* ***************************
 *  Build vehicle detail view
 * ************************** */
invCont.buildVehicleDetail = async function (req, res, next) {
  const invId = req.params.invId;

  try {
    const vehicle = await invModel.getVehicleById(invId);
    if (vehicle) {
      let nav = await utilities.getNav();
      const vehicleDetail = utilities.buildVehicleDetail(vehicle);
      res.render("./inventory/detail", {
        title: vehicle.inv_make + " " + vehicle.inv_model,
        nav,
        vehicleDetail,
      });
    } else {
      res.status(404).render("404", { title: "404 - Vehicle Not Found", nav: await utilities.getNav() });
    }
  } catch (error) {
    console.error("Error fetching vehicle details: ", error);
    res.status(500).send("Server Error");
  }
};



module.exports = invCont



/*hcgsgh*/

