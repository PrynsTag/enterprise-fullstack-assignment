const Track = require('../models/tracks');

const tracksController = {
  async getAll(req, res, next) {
    try {
      const { limit, offset } = req.query;
      const tracks = await Track.getAll({ limit: parseInt(limit), offset: parseInt(offset) });
      res.json({ success: true, data: tracks });
    } catch (err) {
      next(err);
    }
  },

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const track = await Track.getById(id);
      if (!track) {
        return res.status(404).json({ success: false, message: 'Track not found' });
      }
      res.json({ success: true, data: track });
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const track = await Track.create(req.body);
      res.status(201).json({ success: true, data: track });
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const track = await Track.update(id, req.body);
      if (!track) {
        return res.status(404).json({ success: false, message: 'Track not found' });
      }
      res.json({ success: true, data: track });
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const track = await Track.delete(id);
      if (!track) {
        return res.status(404).json({ success: false, message: 'Track not found' });
      }
      res.json({ success: true, data: track });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = tracksController;