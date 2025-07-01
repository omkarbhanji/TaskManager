const express = require('express');
const router = express.Router();



const {registerUser, loginUser, getProfile} = require('../controller/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/get-details', getProfile);


module.exports = router;