import React from 'react';
import { Line } from 'react-chartjs-2';
import { Box, Paper, Typography } from '@mui/material';
import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LineChart = ({ title, data, labels }) => {
  // Default data if none provided
  const defaultLabels = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  const defaultData = [18, 25, 23, 35, 35];

  const chartData = {
    labels: labels || defaultLabels,
    datasets: [
      {
        label: title || 'Precio Promedio en Las Colonias Seleccionadas',
        data: data || defaultData,
        fill: 'origin',
        backgroundColor: 'rgba(33, 150, 243, 0.2)',
        borderColor: 'rgba(33, 150, 243, 1)',
        tension: 0.4,
        pointBackgroundColor: 'rgba(33, 150, 243, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
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
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('es-MX', {
                style: 'currency',
                currency: 'MXN',
                minimumFractionDigits: 0
              }).format(context.parsed.y);
            }
            return label;
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return value;
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  return (
    <Paper sx={{ p: 2, height: '300px', width: '100%' }} elevation={1}>
      <Typography variant="subtitle1" fontWeight="bold" mb={1}>
        {title || 'PRECIO PROMEDIO EN LAS COLONIAS SELECCIONADAS'}
      </Typography>
      <Box sx={{ height: 'calc(100% - 30px)' }}>
        <Line data={chartData} options={options} />
      </Box>
    </Paper>
  );
};

export default LineChart; 