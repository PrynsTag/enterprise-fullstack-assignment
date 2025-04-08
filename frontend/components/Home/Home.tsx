import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { useEffect, useState } from 'react';
import api from '../../utils/api';
import ChartSwitcher from '../ChartSwitcher';
import FilterPanel from '../FilterPanel';
import styles from './Home.module.scss';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const HomePage = () => {
  const [filters, setFilters] = useState({});
  const [metrics, setMetrics] = useState({
    playlistEfficiency: [],
    regionalStrengthScore: [],
    playlistRetentionRate: [],
    followerConversionRate: [],
    listenerToStreamRatio: [],
    sevenDayGrowthRate: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters); // Update the filters state
    fetchMetrics(newFilters); // Fetch metrics based on the new filters
  };

  const fetchMetrics = async (filters) => {
    try {
      setLoading(true);

      // Fetch data for each metric using the filters
      const [
        playlistEfficiency,
        regionalStrengthScore,
        playlistRetentionRate,
        followerConversionRate,
        listenerToStreamRatio,
        sevenDayGrowthRate,
      ] = await Promise.all([
        api.getPlaylistEfficiency(filters),
        api.getRegionalStrengthScore(filters),
        api.getPlaylistRetentionRate(filters),
        api.getFollowerConversionRate(filters),
        api.getListenerToStreamRatio(filters),
        api.getSevenDayGrowthRate(filters),
      ]);

      setMetrics({
        playlistEfficiency,
        regionalStrengthScore,
        playlistRetentionRate,
        followerConversionRate,
        listenerToStreamRatio,
        sevenDayGrowthRate,
      });
      setError(null);
    } catch (err) {
      console.error('Failed to fetch metrics:', err);
      setError('Failed to load data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics(filters); // Fetch metrics on initial load
  }, []);

  const generateChartData = (label, data, key, borderColor, backgroundColor) => ({
    labels: data.map((item) => item.date),
    datasets: [
      {
        label,
        data: data.map((item) => item[key]),
        borderColor,
        backgroundColor,
        fill: true,
      },
    ],
  });

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h1>🎵 Chartmetric Artist Performance Dashboard</h1>
        <FilterPanel onFilterChange={handleFilterChange} />
        <div className={styles.summary}>
          <h3>Summary KPIs</h3>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className={styles.error}>{error}</p>
          ) : (
            <div className={styles.kpiCards}>
              <div className={styles.kpiCard}>
                <h4>Playlist Efficiency</h4>
                <p>{metrics.playlistEfficiency.length}</p>
              </div>
              <div className={styles.kpiCard}>
                <h4>Regional Strength Score</h4>
                <p>{metrics.regionalStrengthScore.length}</p>
              </div>
              <div className={styles.kpiCard}>
                <h4>Playlist Retention Rate</h4>
                <p>{metrics.playlistRetentionRate.length}</p>
              </div>
              <div className={styles.kpiCard}>
                <h4>Follower Conversion Rate</h4>
                <p>{metrics.followerConversionRate.length}</p>
              </div>
              <div className={styles.kpiCard}>
                <h4>Listener to Stream Ratio</h4>
                <p>{metrics.listenerToStreamRatio.length}</p>
              </div>
              <div className={styles.kpiCard}>
                <h4>7-Day Growth Rate</h4>
                <p>{metrics.sevenDayGrowthRate.length}</p>
              </div>
            </div>
          )}
        </div>
        <div className={styles.charts}>
          <h3>Performance Charts</h3>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className={styles.error}>{error}</p>
          ) : (
            <div>
              <h4>Playlist Efficiency</h4>
              <ChartSwitcher
                data={generateChartData(
                  'Playlist Efficiency',
                  metrics.playlistEfficiency,
                  'playlist_efficiency',
                  'rgba(75, 192, 192, 1)',
                  'rgba(75, 192, 192, 0.2)'
                )}
                options={{ responsive: true }}
              />
              {/* Repeat for other metrics */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;