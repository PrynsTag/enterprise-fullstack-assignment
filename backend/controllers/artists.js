const Artist = require('../models/artists');

const artistController = {
  async getAll(req, res, next) {
    try {
      const { limit, offset } = req.query;
      const artists = await Artist.getAll({ limit: parseInt(limit), offset: parseInt(offset) });
      res.json({ success: true, data: artists });
    } catch (err) {
      next(err);
    }
  },

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const artist = await Artist.getById(id);
      if (!artist) {
        return res.status(404).json({ success: false, message: 'Artist not found' });
      }
      res.json({ success: true, data: artist });
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const artist = await Artist.create(req.body);
      res.status(201).json({ success: true, data: artist });
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const artist = await Artist.update(id, req.body);
      if (!artist) {
        return res.status(404).json({ success: false, message: 'Artist not found' });
      }
      res.json({ success: true, data: artist });
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const artist = await Artist.delete(id);
      if (!artist) {
        return res.status(404).json({ success: false, message: 'Artist not found' });
      }
      res.json({ success: true, data: artist });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = artistController;