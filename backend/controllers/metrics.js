const Metrics = require('../models/metrics');

const metricsController = {
  async getPlaylistEfficiency(req, res) {
    try {
      const { startDate, endDate, country, artist } = req.query; // Accept filters
      const data = await Metrics.calculatePlaylistEfficiency(startDate, endDate, country, artist);
      res.json(data);
    } catch (error) {
      console.error('Error calculating Playlist Efficiency:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async getRegionalStrengthScore(req, res) {
    try {
      const { startDate, endDate, country, artist } = req.query; // Accept filters
      const data = await Metrics.calculateRegionalStrengthScore(startDate, endDate, country, artist);
      res.json(data);
    } catch (error) {
      console.error('Error calculating Regional Strength Score:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async getActivePlaylistTracks(req, res) {
    try {
      const { startDate, endDate, country, artist } = req.query; // Accept filters
      const data = await Metrics.calculateActivePlaylistTracks(startDate, endDate, country, artist);
      res.json(data);
    } catch (error) {
      console.error('Error calculating Active Playlist Tracks:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async getPlaylistRetentionRate(req, res) {
    try {
      const { startDate, endDate, country, artist } = req.query; // Accept filters
      const data = await Metrics.calculatePlaylistRetentionRate(startDate, endDate, country, artist);
      res.json(data);
    } catch (error) {
      console.error('Error calculating Playlist Retention Rate:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async getFollowerConversionRate(req, res) {
    try {
      const { startDate, endDate, country, artist } = req.query; // Accept filters
      const data = await Metrics.calculateFollowerConversionRate(startDate, endDate, country, artist);
      res.json(data);
    } catch (error) {
      console.error('Error calculating Follower Conversion Rate:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async getListenerToStreamRatio(req, res) {
    try {
      const { startDate, endDate, country, artist } = req.query; // Accept filters
      const data = await Metrics.calculateListenerToStreamRatio(startDate, endDate, country, artist);
      res.json(data);
    } catch (error) {
      console.error('Error calculating Listener-to-Stream Ratio:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async getSevenDayGrowthRate(req, res) {
    try {
      const { startDate, endDate, country, artist } = req.query; // Accept filters
      const data = await Metrics.calculateSevenDayGrowthRate(startDate, endDate, country, artist);
      res.json(data);
    } catch (error) {
      console.error('Error calculating 7-Day Growth Rate:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = metricsController;