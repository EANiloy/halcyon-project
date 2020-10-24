const express = require('express');
const router = express.Router();
const homeController = require('../Controllers/home');
const isLoggedIn = require('../Controllers/Authorization').isLoggedIn;
const isAdmin = require('../Controllers/Authorization').isAdmin;
///Route for getting the index/home page
router.get('/', homeController.getIndex);

// ///Route for creating a new customer information
router.get('/create-customer',isAdmin,homeController.getCreateCustomer);
router.post('/create-customer', homeController.postCreateCustomer);

///Route for viewing customer informations
router.get('/view-customer',isLoggedIn,homeController.getViewCustomer);

///Route for deleting existing customer information
router.post('/delete-customer', homeController.postDeleteCustomer);

//Route for updating an existing customer information
router.get('/update-customer', homeController.getUpdateCustomer);
router.post('/update-customer', homeController.postUpdateCustomer);

module.exports = router;