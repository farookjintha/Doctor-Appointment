const express = require('express');
const { create } = require('../controller/slots');

const router = express.Router();

router.post('/slot/create', create);
// router.get('/slots', list);

module.exports = router;