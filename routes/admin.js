const express=require('express')
const router=express.Router()

const adminController=require('../controller/admincontroller')
const {isLogginned, publicMiddleware} = require("../middlewares/adminMiddleware")

router.get('/login', publicMiddleware,adminController.loadLogin)
router.post('/login',adminController.loginin)


router.get('/dashboard', isLogginned,adminController.loadDashboard)


router.get('/delete-user/:id', adminController.deleteUser);
router.post('/edit-user/:id', adminController.updateUser);

router.post('/create-user',adminController.createUser)


router.get('/search', isLogginned, adminController.searchUser);

router.post('/logout', isLogginned, adminController.adminsignout);


module.exports=router