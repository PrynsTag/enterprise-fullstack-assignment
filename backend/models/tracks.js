const { query } = require('../db');

class Track {
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
      'SELECT * FROM tracks ORDER BY track_id LIMIT $1 OFFSET $2',
      [limit, offset]
    );
    return result.rows;
  }

  static async getById(trackId) {
    const result = await query('SELECT * FROM tracks WHERE track_id = $1', [trackId]);
    return result.rows[0];
  }

  static async create({ track_id, artist_id, track_name, album_name, release_date, duration_ms, explicit, track_image_url }) {
    const result = await query(
      `INSERT INTO tracks (track_id, artist_id, track_name, album_name, release_date, duration_ms, explicit, track_image_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [track_id, artist_id, track_name, album_name, release_date, duration_ms, explicit, track_image_url]
    );
    return result.rows[0];
  }

  static async update(trackId, updates) {
    const fields = Object.keys(updates)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(', ');
    const values = [trackId, ...Object.values(updates)];

    const result = await query(
      `UPDATE tracks SET ${fields} WHERE track_id = $1 RETURNING *`,
      values
    );
    return result.rows[0];
  }

  static async delete(trackId) {
    const result = await query('DELETE FROM tracks WHERE track_id = $1 RETURNING *', [trackId]);
    return result.rows[0];
  }
}

module.exports = Track;