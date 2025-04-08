const { query } = require('../db');

class Country {
  static async getAll({ limit = 20, offset = 0 } = {}) {
    limit = parseInt(limit, 10);
    offset = parseInt(offset, 10);
  
    if (isNaN(limit)) {
      limit = 20; // Default value for limit
    }
    if (isNaN(offset)) {
      offset = 0; // Default value for offset
    }
    const result = await query(
      'SELECT * FROM countries ORDER BY country_code LIMIT $1 OFFSET $2',
      [limit, offset]
    );
    return result.rows;
  }

  static async getByCode(countryCode) {
    const result = await query('SELECT * FROM countries WHERE country_code = $1', [countryCode]);
    return result.rows[0];
  }

  static async create({ country_code, country_name, region, population, spotify_market }) {
    const result = await query(
      `INSERT INTO countries (country_code, country_name, region, population, spotify_market)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [country_code, country_name, region, population, spotify_market]
    );
    return result.rows[0];
  }

  static async update(countryCode, updates) {
    const fields = Object.keys(updates)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(', ');
    const values = [countryCode, ...Object.values(updates)];

    const result = await query(
      `UPDATE countries SET ${fields} WHERE country_code = $1 RETURNING *`,
      values
    );
    return result.rows[0];
  }

  static async delete(countryCode) {
    const result = await query('DELETE FROM countries WHERE country_code = $1 RETURNING *', [countryCode]);
    return result.rows[0];
  }
}

module.exports = Country;