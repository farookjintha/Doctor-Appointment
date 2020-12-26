const express = require('express');
const { create, list, listSearch } = require('../controller/appointment');

const router = express.Router();

router.post('/appointment/create', create);
router.get('/appointments', list);
router.get('/appointments/search', listSearch);



module.exports = router;