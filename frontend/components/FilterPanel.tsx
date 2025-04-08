// filepath: /frontend/components/FilterPanel.tsx
import { useState } from 'react';
import styles from './Home/Home.module.scss';

const FilterPanel = ({ onFilterChange }) => {
  const [country, setCountry] = useState('');
  const [artist, setArtist] = useState('');
  const [metrics, setMetrics] = useState([]);
  const [timeRange, setTimeRange] = useState('7d');

  const handleMetricChange = (metric) => {
    setMetrics((prev) =>
      prev.includes(metric)
        ? prev.filter((m) => m !== metric)
        : [...prev, metric]
    );
  };

  const handleApplyFilters = () => {
    onFilterChange({ country, artist, metrics, timeRange });
  };

  return (
    <div className={styles.filterPanel}>
      <h3>Filters</h3>
      <div>
        <label>Country:</label>
        <select value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value="">All</option>
          <option value="US">United States</option>
          <option value="BR">Brazil</option>
          <option value="IN">India</option>
        </select>
      </div>
      <div>
        <label>Artist:</label>
        <input
          type="text"
          placeholder="Search artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />
      </div>
      <div>
        <label>Metrics:</label>
        <div>
          <label>
            <input
              type="checkbox"
              value="streams"
              onChange={() => handleMetricChange('streams')}
            />
            Streams
          </label>
          <label>
            <input
              type="checkbox"
              value="playlist_adds"
              onChange={() => handleMetricChange('playlist_adds')}
            />
            Playlist Adds
          </label>
          <label>
            <input
              type="checkbox"
              value="playlist_efficiency"
              onChange={() => handleMetricChange('playlist_efficiency')}
            />
            Playlist Efficiency
          </label>
        </div>
      </div>
      <div>
        <label>Time Range:</label>
        <div>
          <label>
            <input
              type="radio"
              name="timeRange"
              value="7d"
              checked={timeRange === '7d'}
              onChange={() => setTimeRange('7d')}
            />
            7 Days
          </label>
          <label>
            <input
              type="radio"
              name="timeRange"
              value="30d"
              checked={timeRange === '30d'}
              onChange={() => setTimeRange('30d')}
            />
            30 Days
          </label>
        </div>
      </div>
      <button onClick={handleApplyFilters}>Apply Filters</button>
    </div>
  );
};

export default FilterPanel;