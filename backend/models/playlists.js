const { query } = require('../db');

class Playlist {
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
      'SELECT * FROM playlists ORDER BY playlist_id LIMIT $1 OFFSET $2',
      [limit, offset]
    );
    return result.rows;
  }

  static async getById(playlistId) {
    const result = await query('SELECT * FROM playlists WHERE playlist_id = $1', [playlistId]);
    return result.rows[0];
  }

  static async create({ playlist_id, playlist_name, curator_id, playlist_type, follower_count, country_code }) {
    const result = await query(
      `INSERT INTO playlists (playlist_id, playlist_name, curator_id, playlist_type, follower_count, country_code)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [playlist_id, playlist_name, curator_id, playlist_type, follower_count, country_code]
    );
    return result.rows[0];
  }

  static async update(playlistId, updates) {
    const fields = Object.keys(updates)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(', ');
    const values = [playlistId, ...Object.values(updates)];

    const result = await query(
      `UPDATE playlists SET ${fields} WHERE playlist_id = $1 RETURNING *`,
      values
    );
    return result.rows[0];
  }

  static async delete(playlistId) {
    const result = await query('DELETE FROM playlists WHERE playlist_id = $1 RETURNING *', [playlistId]);
    return result.rows[0];
  }
}

module.exports = Playlist;