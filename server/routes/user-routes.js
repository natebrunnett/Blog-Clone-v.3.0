const express = require('express'),
router = express.Router(),
controller = require('../controllers/user-controller.js');

router.post('/Register', controller.Register)
router.post('/Login', controller.login)
router.post('/verifyToken', controller.verifyToken)

module.exports = router;