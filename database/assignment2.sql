-- 1. SELECT Query
SELECT * FROM inventory WHERE inv_id = 1;

-- 2. UPDATE Query
UPDATE inventory
SET inv_make = 'Toyota',
	inv_model = 'Camry',
	inv_year = '2021',
	inv_description = 'A reliable and a midsize sedan',
	inv_image = '/images/batmobile.jpg',
    inv_thumbnail = '/images/batmobile-tn.jpg',
    inv_price = '60000',
    inv_miles = '65098',
    inv_color = 'White'
WHERE inv_id = 1;

-- 3. DELETE Statement
DELETE FROM inventory WHERE inv_id = 1;




-- 1. INSERT NEW record for Tony Stark
INSERT INTO account (account_firstname, account_lastname, account_email, account_password)
VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

-- 2. MODIFY Tony Stark record
UPDATE account
SET account_type = 'Admin'
WHERE account_email = 'tony@starkent.com';

-- 3. DELETE Tony Stark record
DELETE FROM account
WHERE account_email = 'tony@starkent.com';

-- 4. Modify the "GM Hummer" record to read "a huge interior" instead of "small interiors"
UPDATE inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_model = 'Hummer' AND inv_make = 'GM';

-- 5. Use an inner join to select the make, model fields from the inventory table and the classification_name field from the classification table for inventory items that belong to the "Sport" category:
SELECT inventory.inv_make, inventory.inv_model, classification.classification_name
FROM inventory
INNER JOIN classification ON inventory.classification_id = classification.classification_id
WHERE classification.classification_name = 'Sport';

-- 6. Update all records in the inventory table to add "/vehicles" to the middle of the file path in the inv_image and inv_thumbnail columns using a single query:
UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');
