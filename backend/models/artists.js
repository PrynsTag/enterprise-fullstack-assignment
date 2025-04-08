const { query } = require('../db');

class Artist {
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
      'SELECT * FROM artists ORDER BY artist_id LIMIT $1 OFFSET $2',
      [limit, offset]
    );
    return result.rows;
  }

  static async getById(artistId) {
    const result = await query(
      'SELECT * FROM artists WHERE artist_id = $1',
      [artistId]
    );
    return result.rows[0];
  }

  static async create({ artist_id, artist_name, genre, label, verified }) {
    const result = await query(
      `INSERT INTO artists (artist_id, artist_name, genre, label, verified)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [artist_id, artist_name, genre, label, verified]
    );
    return result.rows[0];
  }

  static async update(artistId, updates) {
    const fields = Object.keys(updates)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(', ');
    const values = [artistId, ...Object.values(updates)];

    const result = await query(
      `UPDATE artists SET ${fields} WHERE artist_id = $1 RETURNING *`,
      values
    );
    return result.rows[0];
  }

  static async delete(artistId) {
    const result = await query(
      'DELETE FROM artists WHERE artist_id = $1 RETURNING *',
      [artistId]
    );
    return result.rows[0];
  }
}

module.exports = Artist;