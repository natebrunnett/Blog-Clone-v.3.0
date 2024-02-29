const express = require('express'),
router = express.Router(),
controller = require('../controllers/admin-controller.js');

// router.post('add', controller.add)
router.post('/sendToken', controller.sendToken)
router.post('/add', controller.add)
router.post('/login', controller.login)
router.post('/verifyToken', controller.verifyToken)

module.exports = router;