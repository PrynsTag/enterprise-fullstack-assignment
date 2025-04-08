const express = require('express');
const playlistsController = require('../controllers/playlists');

const router = express.Router();

router.get('/', playlistsController.getAll);
router.get('/:id', playlistsController.getById);
router.post('/', playlistsController.create);
router.put('/:id', playlistsController.update);
router.delete('/:id', playlistsController.delete);

module.exports = router;