import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import SearchForm from '../components/search/SearchForm';
import LineChart from '../components/analytics/LineChart';
import BarChart from '../components/analytics/BarChart';

const HistoricalDataPage = () => {
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState({
    prices: {
      labels: ['Ene 2023', 'Feb 2023', 'Mar 2023', 'Abr 2023', 'May 2023'],
      data: [18, 25, 23, 35, 35],
    },
    areas: {
      labels: ['Zona 1', 'Zona 2', 'Zona 3', 'Zona 4'],
      data: [8, 12, 16, 20],
    }
  });

  const handleSearch = (params) => {
    setLoading(true);

    // Simulate API call for analytics data
    setTimeout(() => {
      // Here you would fetch real data based on params
      // For demo purposes, we'll just simulate different data
      const newData = {
        prices: {
          labels: ['Ene 2023', 'Feb 2023', 'Mar 2023', 'Abr 2023', 'May 2023'],
          data: Array(5).fill().map(() => Math.floor(Math.random() * 30) + 10),
        },
        areas: {
          labels: ['Zona 1', 'Zona 2', 'Zona 3', 'Zona 4'],
          data: Array(4).fill().map(() => Math.floor(Math.random() * 15) + 5),
        }
      };

      setChartData(newData);
      setLoading(false);
    }, 800);
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        VISUALIZACIONES DE DATOS EN EL MERCADO
      </Typography>

      {/* Search Form */}
      <SearchForm onSearch={handleSearch} />

      {/* Charts */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <LineChart 
            title="PRECIO PROMEDIO EN LAS COLONIAS SELECCIONADAS" 
            data={chartData.prices.data} 
            labels={chartData.prices.labels} 
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <BarChart 
            title="PROMEDIO MTS2 DE TERRENO EN LAS COLONIAS SELECCIONADAS" 
            data={chartData.areas.data} 
            labels={chartData.areas.labels} 
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default HistoricalDataPage; 