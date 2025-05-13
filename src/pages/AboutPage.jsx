import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import PeopleIcon from '@mui/icons-material/People';
import SearchIcon from '@mui/icons-material/Search';

const AboutPage = () => {
  const features = [
    {
      title: 'Búsqueda Avanzada de Propiedades',
      description: 'Nuestra plataforma ofrece un potente motor de búsqueda que te permite filtrar propiedades por múltiples criterios como ubicación, precio, tamaño y características.',
      icon: <SearchIcon fontSize="large" color="primary" />,
    },
    {
      title: 'Análisis de Mercado',
      description: 'Obtén información valiosa sobre tendencias del mercado inmobiliario, precios promedio por zona, y más métricas para tomar decisiones informadas.',
      icon: <AnalyticsIcon fontSize="large" color="primary" />,
    },
    {
      title: 'Base de Datos Actualizada',
      description: 'Contamos con una amplia base de datos de propiedades en todo México, actualizada constantemente para ofrecerte las mejores opciones.',
      icon: <BusinessIcon fontSize="large" color="primary" />,
    },
    {
      title: 'Soluciones para Agentes y Compradores',
      description: 'Nuestra plataforma está diseñada tanto para agentes inmobiliarios como para compradores, ofreciendo herramientas especializadas para cada uno.',
      icon: <PeopleIcon fontSize="large" color="primary" />,
    },
  ];

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
          Acerca de Inmobidata
        </Typography>
        <Typography variant="body1">
          Inmobidata es una plataforma de análisis inmobiliario diseñada para ayudar a usuarios a analizar
          y visualizar listados de propiedades y tendencias en todo México. Nuestra misión es proporcionar
          información valiosa sobre el mercado inmobiliario para ayudar a compradores, vendedores y agentes 
          a tomar decisiones informadas.
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Box sx={{ mb: 2 }}>
                {feature.icon}
              </Box>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                {feature.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {feature.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
          ¿Por qué elegir Inmobidata?
        </Typography>
        <Typography variant="body1" paragraph>
          Con Inmobidata, tienes acceso a datos actualizados del mercado inmobiliario mexicano, presentados de 
          manera clara y útil. Nuestra plataforma te permite:
        </Typography>
        <ul>
          <Typography component="li" variant="body1" sx={{ mb: 1 }}>
            Buscar propiedades con filtros avanzados para encontrar exactamente lo que necesitas.
          </Typography>
          <Typography component="li" variant="body1" sx={{ mb: 1 }}>
            Analizar tendencias de precios en diferentes zonas y colonias.
          </Typography>
          <Typography component="li" variant="body1" sx={{ mb: 1 }}>
            Comparar el valor de metros cuadrados de terreno y construcción.
          </Typography>
          <Typography component="li" variant="body1" sx={{ mb: 1 }}>
            Exportar información detallada en formato PDF para consultarla cuando lo necesites.
          </Typography>
        </ul>
      </Paper>
    </Box>
  );
};

export default AboutPage; 