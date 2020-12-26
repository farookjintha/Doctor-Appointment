const express = require('express');
const { create } = require('../controller/appointment');

const router = express.Router();

router.post('/appointment/create', create);
// router.get('/slots', list);
// router.get('/slots/search', listSearch);



module.exports = router;