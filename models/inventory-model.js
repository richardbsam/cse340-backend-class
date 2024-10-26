const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id]
    )
    return data.rows
  } catch (error) {
    console.error("getclassificationsbyid error " + error)
  }
}

/* ***************************
 *  Get specific vehicle by ID
 * ************************** */
async function getVehicleById(invId) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory WHERE inv_id = $1`, 
      [invId]
    );
    return data.rows[0];
  } catch (error) {
    console.error("getVehicleById error " + error);
    return null;
  }
}

/* ***************************
 *  Insert new classification into the database
 * ************************** */
async function insertClassification(classification_name) {
  try {
    const sql = `INSERT INTO classification (classification_name) VALUES ($1) RETURNING classification_id`;
    const result = await pool.query(sql, [classification_name]);
    return result.rows[0].classification_id;
  } catch (error) {
    console.error("Error inserting classification:", error);
    return null;
  }
}


/*ljdfoajodbnogokmfk*/
async function getNav() {
  try {
    const sql = "SELECT classification_name FROM classification";
    const result = await pool.query(sql);
    let nav = '<ul>';
    result.rows.forEach((row) => {
      nav += `<li><a href="/inv/type/${row.classification_name}">${row.classification_name}</a></li>`;
    });
    nav += '</ul>';
    return nav;
  } catch (error) {
    console.error("Error fetching navigation:", error);
    throw error;
  }
}

async function refreshNav() {
  // You could cache this result or rebuild the nav dynamically
  await getNav();
}




module.exports = { getVehicleById, getClassifications, getInventoryByClassificationId, insertClassification, getNav, refreshNav };

