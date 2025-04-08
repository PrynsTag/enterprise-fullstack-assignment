const Playlist = require('../models/playlists');

const playlistsController = {
  async getAll(req, res, next) {
    try {
      const { limit, offset } = req.query;
      const playlists = await Playlist.getAll({ limit: parseInt(limit), offset: parseInt(offset) });
      res.json({ success: true, data: playlists });
    } catch (err) {
      next(err);
    }
  },

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const playlist = await Playlist.getById(id);
      if (!playlist) {
        return res.status(404).json({ success: false, message: 'Playlist not found' });
      }
      res.json({ success: true, data: playlist });
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const playlist = await Playlist.create(req.body);
      res.status(201).json({ success: true, data: playlist });
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const playlist = await Playlist.update(id, req.body);
      if (!playlist) {
        return res.status(404).json({ success: false, message: 'Playlist not found' });
      }
      res.json({ success: true, data: playlist });
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const playlist = await Playlist.delete(id);
      if (!playlist) {
        return res.status(404).json({ success: false, message: 'Playlist not found' });
      }
      res.json({ success: true, data: playlist });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = playlistsController;