const express = require('express');
const metricsController = require('../controllers/metrics');

const router = express.Router();

// Define routes for each metric
router.get('/playlist-efficiency', metricsController.getPlaylistEfficiency);
router.get('/regional-strength-score', metricsController.getRegionalStrengthScore);
router.get('/active-playlist-tracks', metricsController.getActivePlaylistTracks);
router.get('/playlist-retention-rate', metricsController.getPlaylistRetentionRate);
router.get('/follower-conversion-rate', metricsController.getFollowerConversionRate);
router.get('/listener-to-stream-ratio', metricsController.getListenerToStreamRatio);
router.get('/seven-day-growth-rate', metricsController.getSevenDayGrowthRate);

module.exports = router;