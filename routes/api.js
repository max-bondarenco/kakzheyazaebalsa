'use strict';
const express = require('express')
const router = express.Router()
const {ConvertHandler} = require('../controllers/convertHandler')

router.route('/convert').get(ConvertHandler)

module.exports = router;
