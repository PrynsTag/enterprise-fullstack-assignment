import { Line } from 'react-chartjs-2';

const CalculatedMetricsChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: 'Playlist Efficiency',
        data: data.map((item) => item.playlist_efficiency),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'Regional Strength Score',
        data: data.map((item) => item.regional_strength_score),
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: true,
      },
      {
        label: 'Follower Conversion Rate',
        data: data.map((item) => item.follower_conversion_rate),
        borderColor: 'rgba(255, 159, 64, 1)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        fill: true,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default CalculatedMetricsChart;