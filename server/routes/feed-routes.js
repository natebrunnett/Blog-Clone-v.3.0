const express = require('express'),
router = express.Router(),
controller = require('../controllers/feed-controller.js');

router.post('/fetch', controller.getAll)
router.post('/add', controller.add)
router.post('/deleteOne', controller.deleteOne)

module.exports = router;