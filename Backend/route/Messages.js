const express = require('express');
const router = express.Router();
const { sendMessage } = require('../controller/Messages');
const authentication = require('../middleware/authentication');

// POST /api/messages/:contractId
router.route('/:contractId').post(authentication, sendMessage);

module.exports = router;