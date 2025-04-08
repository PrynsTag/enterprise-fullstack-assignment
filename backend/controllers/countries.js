const Country = require('../models/countries');

const countriesController = {
  async getAll(req, res, next) {
    try {
      const countries = await Country.getAll();
      res.json({ success: true, data: countries });
    } catch (err) {
      next(err);
    }
  },

  async getByCode(req, res, next) {
    try {
      const { code } = req.params;
      const country = await Country.getByCode(code);
      if (!country) {
        return res.status(404).json({ success: false, message: 'Country not found' });
      }
      res.json({ success: true, data: country });
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const country = await Country.create(req.body);
      res.status(201).json({ success: true, data: country });
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const { code } = req.params;
      const country = await Country.update(code, req.body);
      if (!country) {
        return res.status(404).json({ success: false, message: 'Country not found' });
      }
      res.json({ success: true, data: country });
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      const { code } = req.params;
      const country = await Country.delete(code);
      if (!country) {
        return res.status(404).json({ success: false, message: 'Country not found' });
      }
      res.json({ success: true, data: country });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = countriesController;