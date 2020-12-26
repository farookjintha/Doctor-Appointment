const express = require('express');
const { create, list, listSearch } = require('../controller/slots');


const router = express.Router();

router.post('/slot/create', create);
router.get('/slots', list);
router.get('/slots/search', listSearch);



module.exports = router;