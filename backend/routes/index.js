const express = require('express');
const artistRoutes = require('./artists');
const countryRoutes = require('./countries');
const playlistRoutes = require('./playlists');
const trackRoutes = require('./tracks');
const metricsRoutes = require('./metrics');

const router = express.Router();

router.use('/artists', artistRoutes);
router.use('/countries', countryRoutes);
router.use('/playlists', playlistRoutes);
router.use('/tracks', trackRoutes);
router.use('/metrics', metricsRoutes);

module.exports = router;