// Import the utilities file for use in this controller
const utilities = require("../utilities");

/* ****************************************
*  Deliver login view
* *************************************** */
async function buildLogin(req, res, next) {
  console.log("buildLogin function called");
  let nav = await utilities.getNav()
  res.render("account/login", {
    title: "Login",
    nav,
  })
}

module.exports = { buildLogin }