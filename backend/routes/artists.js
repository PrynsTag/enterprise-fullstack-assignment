const express = require('express');
const artistController = require('../controllers/artists');

const router = express.Router();

router.get('/', artistController.getAll);
router.get('/:id', artistController.getById);
router.post('/', artistController.create);
router.put('/:id', artistController.update);
router.delete('/:id', artistController.delete);

module.exports = router;