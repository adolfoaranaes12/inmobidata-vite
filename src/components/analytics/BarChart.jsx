import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Box, Paper, Typography } from '@mui/material';
import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ title, data, labels }) => {
  // Default data if none provided
  const defaultLabels = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
  const defaultData = [8, 12, 16, 20];

  const chartData = {
    labels: labels || defaultLabels,
    datasets: [
      {
        label: title || 'Promedio Mts2 de Terreno en Las Colonias Seleccionadas',
        data: data || defaultData,
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(32, 99, 155, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(32, 99, 155, 1)',
        ],
        borderWidth: 1,
        borderRadius: 5,
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
              label += `${context.parsed.y} m²`;
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
            return `${value} m²`;
          },
        },
      },
    },
  };

  return (
    <Paper sx={{ p: 2, height: '300px', width: '100%' }} elevation={1}>
      <Typography variant="subtitle1" fontWeight="bold" mb={1}>
        {title || 'PROMEDIO MTS2 DE TERRENO EN LAS COLONIAS SELECCIONADAS'}
      </Typography>
      <Box sx={{ height: 'calc(100% - 30px)' }}>
        <Bar data={chartData} options={options} />
      </Box>
    </Paper>
  );
};

export default BarChart; 