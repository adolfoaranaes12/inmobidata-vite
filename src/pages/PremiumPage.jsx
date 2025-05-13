import React from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const PremiumPage = () => {
  const plans = [
    {
      title: 'Gratuito',
      price: 0,
      description: 'Explora las funcionalidades básicas',
      features: [
        { text: 'Búsqueda básica de propiedades', included: true },
        { text: 'Visualización de resultados limitados', included: true },
        { text: 'Acceso a datos históricos limitados', included: true },
        { text: 'Exportación PDF básica', included: false },
        { text: 'Análisis avanzado del mercado', included: false },
        { text: 'API de integración', included: false },
      ],
      buttonText: 'Comenzar Gratis',
      buttonColor: 'primary',
      highlighted: false,
    },
    {
      title: 'Premium',
      price: 299,
      description: 'Ideal para compradores y vendedores',
      features: [
        { text: 'Búsqueda avanzada de propiedades', included: true },
        { text: 'Visualización de resultados ilimitados', included: true },
        { text: 'Acceso completo a datos históricos', included: true },
        { text: 'Exportación PDF avanzada', included: true },
        { text: 'Análisis avanzado del mercado', included: true },
        { text: 'API de integración', included: false },
      ],
      buttonText: 'Suscribirse',
      buttonColor: 'primary',
      highlighted: true,
    },
    {
      title: 'Empresarial',
      price: 799,
      description: 'Para agencias inmobiliarias',
      features: [
        { text: 'Búsqueda avanzada de propiedades', included: true },
        { text: 'Visualización de resultados ilimitados', included: true },
        { text: 'Acceso completo a datos históricos', included: true },
        { text: 'Exportación PDF avanzada', included: true },
        { text: 'Análisis avanzado del mercado', included: true },
        { text: 'API de integración', included: true },
      ],
      buttonText: 'Contactar Ventas',
      buttonColor: 'primary',
      highlighted: false,
    },
  ];

  return (
    <Box>
      <Box textAlign="center" sx={{ mb: 6 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
          Planes Premium
        </Typography>
        <Typography variant="body1" maxWidth={700} mx="auto">
          Desbloquea todo el potencial de Inmobidata con nuestros planes premium.
          Accede a datos históricos completos, análisis avanzados y más herramientas
          para tomar decisiones inmobiliarias informadas.
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {plans.map((plan, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper 
              elevation={plan.highlighted ? 8 : 1}
              sx={{ 
                p: 3, 
                height: '100%',
                display: 'flex', 
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
                border: plan.highlighted ? '2px solid #2196F3' : 'none',
              }}
            >
              {plan.highlighted && (
                <Box 
                  sx={{ 
                    position: 'absolute',
                    top: 20,
                    right: -30,
                    transform: 'rotate(45deg)',
                    bgcolor: '#FFA726',
                    color: 'white',
                    py: 0.5,
                    px: 4,
                    fontWeight: 'bold',
                  }}
                >
                  Más Popular
                </Box>
              )}

              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {plan.title}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2 }}>
                <Typography variant="h4" fontWeight="bold" color="primary">
                  ${plan.price}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" ml={1}>
                  /mes
                </Typography>
              </Box>
              
              <Typography variant="body2" color="text.secondary" mb={2}>
                {plan.description}
              </Typography>
              
              <Divider sx={{ my: 2 }} />
              
              <List sx={{ mb: 2, flexGrow: 1 }}>
                {plan.features.map((feature, featureIndex) => (
                  <ListItem key={featureIndex} sx={{ px: 0, py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      {feature.included ? (
                        <CheckIcon color="success" fontSize="small" />
                      ) : (
                        <CloseIcon color="disabled" fontSize="small" />
                      )}
                    </ListItemIcon>
                    <ListItemText 
                      primary={feature.text} 
                      primaryTypographyProps={{ 
                        variant: 'body2',
                        color: feature.included ? 'text.primary' : 'text.secondary',
                      }} 
                    />
                  </ListItem>
                ))}
              </List>
              
              <Button 
                variant={plan.highlighted ? "contained" : "outlined"} 
                color={plan.buttonColor}
                fullWidth
                sx={{ mt: 'auto' }}
              >
                {plan.buttonText}
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box mt={8} p={4} bgcolor="#f5f5f5" borderRadius={2}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          ¿Necesitas una solución personalizada?
        </Typography>
        <Typography variant="body1" paragraph>
          Si buscas una solución a medida para tu empresa o tienes requisitos específicos,
          podemos crear un plan personalizado para ti.
        </Typography>
        <Button variant="contained" color="primary">
          Contactar para plan personalizado
        </Button>
      </Box>
    </Box>
  );
};

export default PremiumPage; 