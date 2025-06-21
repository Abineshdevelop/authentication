const express = require('express');
const router = express.Router();

const usercontroller = require('../controller/usercontroller');
const { isUserLoggedIn, publicUserMiddleware } = require('../middlewares/userMiddleware');


//login
router.get('/login',publicUserMiddleware, usercontroller.loadLogin);


//register
router.get('/register',publicUserMiddleware, usercontroller.loadRegister);


//user login
router.post('/login',usercontroller.login)
//registration
router.post('/register', usercontroller.registerUser);
router.get('/home',isUserLoggedIn, usercontroller.fetchHome)


// Private routes (only accessible when logged in)
router.post('/logout', isUserLoggedIn, usercontroller.signout);


module.exports = router