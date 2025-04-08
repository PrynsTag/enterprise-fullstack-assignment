// filepath: /frontend/components/ChartSwitcher.tsx
import { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';

const ChartSwitcher = ({ data, options }) => {
  const [chartType, setChartType] = useState('line');

  return (
    <div>
      <button onClick={() => setChartType('line')}>Line Chart</button>
      <button onClick={() => setChartType('bar')}>Bar Chart</button>
      {chartType === 'line' ? (
        <Line data={data} options={options} />
      ) : (
        <Bar data={data} options={options} />
      )}
    </div>
  );
};

export default ChartSwitcher;