const { query } = require('../db');

const Metrics = {
  async calculatePlaylistEfficiency(startDate, endDate, country, artist) {
    const conditions = [];
    const params = [];

    if (startDate && endDate) {
      conditions.push('date BETWEEN $1 AND $2');
      params.push(startDate, endDate);
    }
    if (country) {
      conditions.push('country_code = $' + (params.length + 1));
      params.push(country);
    }
    if (artist) {
      conditions.push('artist_id = $' + (params.length + 1));
      params.push(artist);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
    const sql = `
      SELECT
        date,
        SUM(streams) / NULLIF(SUM(playlist_adds), 0) AS playlist_efficiency
      FROM daily_metrics
      ${whereClause}
      GROUP BY date
      ORDER BY date;
    `;

    const result = await query(sql, params);
    return result.rows;
  },

  async calculateRegionalStrengthScore(startDate, endDate, country, artist) {
    const conditions = [];
    const params = [];
    
    if (startDate && endDate) {
      conditions.push('date BETWEEN $1 AND $2');
      params.push(startDate, endDate);
    }
    if (country) {
      conditions.push('country_code = $' + (params.length + 1));
      params.push(country);
    }
    if (artist) {
      conditions.push('artist_id = $' + (params.length + 1));
      params.push(artist);
    }
    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const sql = `
      SELECT
        date,
        country_code,
        SUM(streams) AS country_streams,
        SUM(SUM(streams)) OVER (PARTITION BY date) AS global_streams,
        SUM(streams) / NULLIF(SUM(SUM(streams)) OVER (PARTITION BY date), 0) AS regional_strength_score
      FROM daily_metrics
      ${whereClause}
      GROUP BY date, country_code
      ORDER BY date, country_code;
    `;
    const result = await query(sql, params);
    return result.rows;
  },

  async calculateActivePlaylistTracks(startDate, endDate, country, artist) {
    const conditions = [];
    const params = [];
    
    if (startDate && endDate) {
      conditions.push('date BETWEEN $1 AND $2');
      params.push(startDate, endDate);
    }
    if (country) {
      conditions.push('country_code = $' + (params.length + 1));
      params.push(country);
    }
    if (artist) {
      conditions.push('artist_id = $' + (params.length + 1));
      params.push(artist);
    }
    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const sql = `
      SELECT
        date,
        COUNT(DISTINCT CASE WHEN playlist_adds > 0 THEN track_id END) AS active_playlist_tracks
      FROM daily_metrics
      ${whereClause}
      GROUP BY date
      ORDER BY date;
    `;
    const result = await query(sql, params);
    return result.rows;
  },

  async calculatePlaylistRetentionRate(startDate, endDate, country, artist) {
    const conditions = [];
    const params = [];
    
    if (startDate && endDate) {
      conditions.push('date BETWEEN $1 AND $2');
      params.push(startDate, endDate);
    }
    if (country) {
      conditions.push('country_code = $' + (params.length + 1));
      params.push(country);
    }
    if (artist) {
      conditions.push('artist_id = $' + (params.length + 1));
      params.push(artist);
    }
    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const sqlDistinctTracks = `
      SELECT
        date,
        COUNT(DISTINCT CASE WHEN playlist_adds > 0 THEN track_id END) AS distinct_tracks_added
      FROM daily_metrics
      ${whereClause}
      GROUP BY date
      ORDER BY date;
    `;
  
    const sqlTotalPlaylistAdds = `
      SELECT
        date,
        SUM(playlist_adds) AS total_playlist_adds
      FROM daily_metrics
      ${whereClause}
      GROUP BY date
      ORDER BY date;
    `;
  
    const distinctTracks = await query(sqlDistinctTracks, params);
    const totalPlaylistAdds = await query(sqlTotalPlaylistAdds, params);
  
    const retentionRates = distinctTracks.rows.map((row) => {
      const matchingRow = totalPlaylistAdds.rows.find((r) => r.date === row.date);
      const totalAdds = matchingRow ? matchingRow.total_playlist_adds : 0;
      return {
        date: row.date,
        playlist_retention_rate: totalAdds > 0 ? row.distinct_tracks_added / totalAdds : 0,
      };
    });
  
    return retentionRates;
  },

  async calculateFollowerConversionRate(startDate, endDate, country, artist) {
    const conditions = [];
    const params = [];
    
    if (startDate && endDate) {
      conditions.push('date BETWEEN $1 AND $2');
      params.push(startDate, endDate);
    }
    if (country) {
      conditions.push('country_code = $' + (params.length + 1));
      params.push(country);
    }
    if (artist) {
      conditions.push('artist_id = $' + (params.length + 1));
      params.push(artist);
    }
    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const sql = `
      SELECT
        date,
        CASE
          WHEN SUM(streams) = 0 THEN 0
          ELSE SUM(followers_gains) / SUM(streams)
        END AS follower_conversion_rate
      FROM daily_metrics
      ${whereClause}
      GROUP BY date
      ORDER BY date;
    `;
  
    const result = await query(sql, params);
    return result.rows;
  },

  async calculateListenerToStreamRatio(startDate, endDate, country, artist) {
    const conditions = [];
    const params = [];
    
    if (startDate && endDate) {
      conditions.push('date BETWEEN $1 AND $2');
      params.push(startDate, endDate);
    }
    if (country) {
      conditions.push('country_code = $' + (params.length + 1));
      params.push(country);
    }
    if (artist) {
      conditions.push('artist_id = $' + (params.length + 1));
      params.push(artist);
    }
    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const sql = `
      SELECT
        date,
        CASE
          WHEN SUM(unique_listeners) = 0 THEN 0
          ELSE SUM(streams) / SUM(unique_listeners)
        END AS listener_to_stream_ratio
      FROM daily_metrics
      ${whereClause}
      GROUP BY date
      ORDER BY date;
    `;
  
    const result = await query(sql, params);
    return result.rows;
  },

  async calculateSevenDayGrowthRate(startDate, endDate, country, artist) {
    const conditions = [];
    const params = [];
    
    if (startDate && endDate) {
      conditions.push('date BETWEEN $1 AND $2');
      params.push(startDate, endDate);
    }
    if (country) {
      conditions.push('country_code = $' + (params.length + 1));
      params.push(country);
    }
    if (artist) {
      conditions.push('artist_id = $' + (params.length + 1));
      params.push(artist);
    }
    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const sql = `
      SELECT
        date,
        SUM(streams) AS total_streams
      FROM daily_metrics
      ${whereClause}
      GROUP BY date
      ORDER BY date;
    `;
  
    const streamsByDate = await query(sql, params);
  
    const growthRates = streamsByDate.rows.map((row, index, array) => {
      if (index < 7) {
        return { date: row.date, seven_day_growth_rate: null }; // Not enough data for 7-day growth
      }
  
      const previousWeekRow = array[index - 7];
      const previousWeekTotal = previousWeekRow ? previousWeekRow.total_streams : 0;
      const currentTotal = row.total_streams;
  
      return {
        date: row.date,
        seven_day_growth_rate: previousWeekTotal > 0 ? (currentTotal - previousWeekTotal) / previousWeekTotal : 0,
      };
    });
  
    return growthRates;
  }
};

module.exports = Metrics;