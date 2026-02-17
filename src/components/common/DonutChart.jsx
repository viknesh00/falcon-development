import React from 'react';
import PropTypes from 'prop-types';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({
  percentage,
  color = '#EF4444',
  trackColor = '#e0e0e0',
  size = 120,
  strokeWidth = 10,
}) => {
  const data = {
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: [color, trackColor],
        borderWidth: 0,
        cutout: '70%',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <Doughnut data={data} options={options} />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#333',
          pointerEvents: 'none',
        }}
      >
        <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{percentage}%</span>
        <span style={{ fontSize: '0.8rem', color: '#666' }}>Completed</span>
      </div>
    </div>
  );
};

DonutChart.propTypes = {
  percentage: PropTypes.number.isRequired,
  color: PropTypes.string,
  trackColor: PropTypes.string,
  size: PropTypes.number,
  strokeWidth: PropTypes.number,
};

export default DonutChart;
