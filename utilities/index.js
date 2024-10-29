const invModel = require("../models/inventory-model")
const Util = {}
const jwt = require("jsonwebtoken")
require("dotenv").config()


/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  try {
    let data = await invModel.getClassifications();  // Fetch classifications from the database
    let list = "<ul>";
    list += '<li><a href="/" title="Home page">Home</a></li>';
    
    // If the data is valid, populate the list
    data.rows.forEach((row) => {
      list += "<li>";
      list += '<a href="/inv/type/' + row.classification_id +
              '" title="See our inventory of ' + row.classification_name + ' vehicles">' +
              row.classification_name + "</a>";
      list += "</li>";
    });
    list += "</ul>";
    
    return list;
  } catch (error) {
    console.error("Error in getNav():", error);  // Log the error for debugging
    throw error;  // Re-throw the error to be handled by the calling function
  }
};

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
    let grid
    if(data.length > 0){
      grid = '<ul id="inv-display">'
      data.forEach(vehicle => { 
        grid += '<li>'
        grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
        + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
        + 'details"><img src="' + vehicle.inv_thumbnail 
        +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
        +' on CSE Motors" /></a>'
        grid += '<div class="namePrice">'
        grid += '<hr />'
        grid += '<h2>'
        grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
        + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
        + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
        grid += '</h2>'
        grid += '<span>$' 
        + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
        grid += '</div>'
        grid += '</li>'
      })
      grid += '</ul>'
    } else { 
      grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
    }
    return grid
  }

 /* ************************
 * Build the vehicle detail HTML
 ************************** */
 Util.buildVehicleDetail = function(vehicle) {
  let detailHtml = "<div class='vehicle-detail'>"
  
  // Vehicle Container using Flexbox for layout
  detailHtml += "<div class='vehicle-detail-container'>"
  
  // Vehicle Image (on the left, full-size image)
  detailHtml += '<div class="vehicle-image">'
  detailHtml += '<img src="' + vehicle.inv_image + '" alt="Image of ' 
  + vehicle.inv_make + ' ' + vehicle.inv_model + '" />'
  detailHtml += '</div>'
  
  // Vehicle Details (on the right)
  detailHtml += '<div class="vehicle-info">'
  
  // Vehicle Heading (Make, Model, Year)
  detailHtml += '<h2>' + vehicle.inv_year + ' ' + vehicle.inv_make + ' ' + vehicle.inv_model + ' </h2>'
  
  // Vehicle Price
  detailHtml += '<h2 class="price"><strong>$' 
  + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</strong></h2>'

  // Vehicle Description
  detailHtml += '<p>' + vehicle.inv_description + '</p>'
  
  // Vehicle Color
  detailHtml += '<p class="color"><strong>Color:</strong> ' + vehicle.inv_color + '</p>'
  
  // Mileage with proper place value commas, bold only the title
  let mileage = vehicle.inv_miles;  // Correct field for mileage
  if (isNaN(mileage)) {
    mileage = 0; // Default to 0 if mileage is not a valid number
  }
  detailHtml += '<p class="mileage"><strong>Mileage:</strong> ' 
  + new Intl.NumberFormat('en-US').format(mileage) + ' miles</p>'
  
  detailHtml += '</div>'  // Close vehicle-info div
  detailHtml += "</div>"  // Close vehicle-detail-container div
  
  detailHtml += "</div>"  // Close vehicle-detail div
  
  return detailHtml
}

Util.buildClassificationList = async function (classification_id = null) {
  let data = await invModel.getClassifications();
  let classificationList = '<select name="classification_id" id="classificationList" required>';
  classificationList += "<option value=''>Choose a Classification</option>";
  data.rows.forEach((row) => {
    classificationList += '<option value="' + row.classification_id + '"';
    if (classification_id && row.classification_id == classification_id) {
      classificationList += " selected ";
    }
    classificationList += ">" + row.classification_name + "</option>";
  });
  classificationList += "</select>";
  return classificationList;
};

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

/* ****************************************
* Middleware to check token validity
**************************************** */
Util.checkJWTToken = (req, res, next) => {
  if (req.cookies.jwt) {
   jwt.verify(
    req.cookies.jwt,
    process.env.ACCESS_TOKEN_SECRET,
    function (err, accountData) {
     if (err) {
      req.flash("Please log in")
      res.clearCookie("jwt")
      return res.redirect("/account/login")
     }
     res.locals.accountData = accountData
     res.locals.loggedin = 1
     next()
    })
  } else {
   next()
  }
}


/* ****************************************
 *  Check Login
 * ************************************ */
Util.checkLogin = (req, res, next) => {
  if (res.locals.loggedin) {
    next()
  } else {
    req.flash("notice", "Please log in.")
    return res.redirect("/account/login")
  }
 }


module.exports = Util
