import { Bar } from 'react-chartjs-2';

const BarChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: 'Metric',
        data: data.map((item) => item.value),
        backgroundColor: 'rgba(75,192,192,0.4)',
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default BarChart;