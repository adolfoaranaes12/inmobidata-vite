import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  CircularProgress,
  Typography,
  IconButton,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import HomeIcon from '@mui/icons-material/Home';
import { downloadMultiplePropertiesPDF } from '../../utils/pdfGenerator';

const MultiPropertyPDFModal = ({ open, onClose, properties }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2
    }).format(price);
  };

  const handleDownload = async () => {
    if (!properties || properties.length === 0) {
      setError('No hay propiedades seleccionadas para generar el PDF.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await downloadMultiplePropertiesPDF(properties);
      onClose();
    } catch (err) {
      console.error('Error downloading multiple properties PDF:', err);
      setError('Hubo un error al generar el PDF. Por favor, intente de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      aria-labelledby="multi-property-dialog-title"
    >
      <DialogTitle id="multi-property-dialog-title" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Generar PDF de Propiedades Seleccionadas
        <IconButton aria-label="close" onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent dividers>
        {loading ? (
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={4}>
            <CircularProgress />
            <Typography variant="body2" sx={{ mt: 2 }}>
              Generando PDF...
            </Typography>
          </Box>
        ) : (
          <>
            {error && (
              <Box mb={2} p={2} bgcolor="#fff4e5" borderRadius={1}>
                <Typography color="error">{error}</Typography>
              </Box>
            )}

            <Typography variant="subtitle1" gutterBottom>
              El PDF incluirá las siguientes {properties?.length || 0} propiedades:
            </Typography>

            <Box mt={2} mb={3} p={2} bgcolor="#f5f5f5" borderRadius={1}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2">
                    <strong>Contenido del PDF:</strong>
                  </Typography>
                  <ul>
                    <li>Página de portada con información general</li>
                    <li>Una página individual para cada propiedad</li>
                    <li>Información detallada de cada propiedad</li>
                    <li>Imagen principal de cada propiedad</li>
                    <li>Características y detalles técnicos</li>
                  </ul>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2">
                    <strong>Formato:</strong> PDF
                  </Typography>
                  <Typography variant="body2">
                    <strong>Tamaño estimado:</strong> {properties?.length ? properties.length * 0.5 : 0}MB
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    Puede utilizar este PDF para compartir las propiedades seleccionadas con otras personas o guardarlas para su posterior consulta.
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1" gutterBottom>
              Propiedades seleccionadas:
            </Typography>

            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              {properties?.map((property, index) => (
                <ListItem 
                  key={property.id} 
                  divider={index < properties.length - 1}
                  sx={{ py: 1 }}
                >
                  <ListItemAvatar>
                    <Avatar 
                      src={property.images?.[0]} 
                      alt={property.title}
                      variant="rounded"
                      sx={{ width: 60, height: 60, mr: 1 }}
                    >
                      <HomeIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary={property.title}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="primary" fontWeight="medium">
                          {formatPrice(property.price)}
                        </Typography>
                        <Typography component="span" variant="body2" color="text.secondary">
                          {` · ${property.location} · ${property.bedrooms} rec. · ${property.bathrooms} baños · ${property.landArea} m²`}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </>
        )}
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Cancelar
        </Button>
        <Button 
          onClick={handleDownload} 
          variant="contained" 
          color="primary" 
          startIcon={<DownloadIcon />}
          disabled={loading || !properties?.length}
        >
          Generar y Descargar PDF
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MultiPropertyPDFModal; 