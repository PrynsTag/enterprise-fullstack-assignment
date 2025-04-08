import axios from 'axios';
import { useEffect, useState } from 'react';
import ChartSwitcher from '../components/ChartSwitcher';
import FilterPanel from '../components/FilterPanel';
import SummaryKPI from '../components/SummaryKPI';

const Dashboard = () => {
  const [filters, setFilters] = useState({
    country: '',
    artist: '',
    metric: 'streams',
    timeRange: '7',
  });
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/api/metrics', { params: filters });
      setData(response.data.data);
    };
    fetchData();
  }, [filters]);

  return (
    <div>
      <FilterPanel filters={filters} setFilters={setFilters} />
      <SummaryKPI data={data} />
      <ChartSwitcher data={data} />
    </div>
  );
};

export default Dashboard;