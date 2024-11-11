import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, linearGradient } from 'recharts';

const AnalyticChart = ({ data = [] }) => {
  // If there's only one data point, add a dummy point to help with rendering.
  const chartData = data.length > 1 ? data : [
    ...data,
    { month: 'Month', totalClick: 0 },  // Placeholder to ensure two points
  ];

  console.log("Chart Data:", chartData);

  return (
    <div>
      <ResponsiveContainer width="100%" height={100}>
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="month" style={{ fontSize: 12 }} />
          <YAxis style={{ fontSize: 12 }} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="totalClick"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticChart;
