const express = require('express');
const countriesController = require('../controllers/countries');

const router = express.Router();

router.get('/', countriesController.getAll);
router.get('/:code', countriesController.getByCode);
router.post('/', countriesController.create);
router.put('/:code', countriesController.update);
router.delete('/:code', countriesController.delete);

module.exports = router;