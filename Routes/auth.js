const express = require('express');

const router = express.Router();
const authController = require('../Controllers/auth');
const isLoggedIn = require('../Controllers/Authorization').isLoggedIn;

///Routes for managing logins
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

///Routes for managing signups
router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);

router.get('/logout',isLoggedIn,authController.postLogout)

module.exports = router;