const express = require('express');
const tracksController = require('../controllers/tracks');

const router = express.Router();

router.get('/', tracksController.getAll);
router.get('/:id', tracksController.getById);
router.post('/', tracksController.create);
router.put('/:id', tracksController.update);
router.delete('/:id', tracksController.delete);

module.exports = router;