const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

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

  
  /*dgchcs*/

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


/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)


module.exports = Util
