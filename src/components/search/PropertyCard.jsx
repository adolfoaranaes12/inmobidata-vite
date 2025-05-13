import React, { useState, useRef } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Grid,
  Button,
  Chip,
  IconButton,
  Checkbox,
  FormControlLabel,
  Divider,
} from '@mui/material';
import BathtubIcon from '@mui/icons-material/Bathtub';
import BedroomChildIcon from '@mui/icons-material/BedroomChild';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import GarageIcon from '@mui/icons-material/Garage';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import PDFPreviewModal from '../common/PDFPreviewModal';

const PropertyCard = ({ property, onSelect, isSelected }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [pdfPreviewOpen, setPdfPreviewOpen] = useState(false);
  const cardRef = useRef(null);

  // Default property if none provided
  const defaultProperty = {
    id: '0000001',
    title: 'Casa en Venta en Carretera Nacional, Monterrey, NL',
    description: 'Casa en venta en Tamaulipas, con excelente ubicación y seguridad las 24 horas. Esta propiedad cuenta con 3 recámaras más una con su baño y walk-in closet, 2 cajones de estacionamiento, patio con acceso a jardín privado de la colonia, cuarto de servicio, cocina equipada, cisterna, portón automatizado. Con una antigüedad de 20 años, en 200m2 de terreno con 7.5 metros de frente y 241 metros de construcción. Esta casa es ideal para una familia que busca comodidad y tranquilidad.',
    price: 13450000,
    location: 'Colonia Las Fresnos, Monterrey, NL',
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    ],
    bedrooms: 3,
    bathrooms: 2,
    landArea: 200,
    constructionArea: 241,
    features: ['Alberca', 'Jardín', 'Seguridad', 'Estacionamiento', 'Amueblado parcialmente', 'Terraza'],
    publisher: 'Eduardo Ibarra',
    contact: 'XXXXXXXXXX',
    publisherLogo: 'https://via.placeholder.com/50',
  };

  const prop = property || defaultProperty;

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? prop.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => 
      prevIndex === prop.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2
    }).format(price);
  };

  const handleOpenPDFPreview = () => {
    setPdfPreviewOpen(true);
  };

  const handleClosePDFPreview = () => {
    setPdfPreviewOpen(false);
  };

  const handleCheckboxChange = (event) => {
    if (onSelect) {
      onSelect(prop, event.target.checked);
    }
  };

  return (
    <>
      <Card
        ref={cardRef}
        sx={{ 
          mb: 4, 
          overflow: 'visible', 
          boxShadow: 2, 
          borderRadius: 2,
          border: isSelected ? '2px solid #2196F3' : 'none',
        }}
        className="property-card"
      >
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
          {/* Property image carousel */}
          <Box 
            sx={{ 
              position: 'relative',
              width: { xs: '100%', md: '40%' },
              minWidth: { md: '300px' },
            }}
          >
            <CardMedia
              component="img"
              image={prop.images[currentImageIndex]}
              alt={prop.title}
              sx={{ 
                height: 300,
                objectFit: 'cover',
              }}
            />
            {prop.images.length > 1 && (
              <>
                <IconButton
                  onClick={handlePrevImage}
                  sx={{
                    position: 'absolute',
                    left: 8,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'rgba(255, 255, 255, 0.7)',
                    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' },
                  }}
                  size="small"
                >
                  <ChevronLeftIcon />
                </IconButton>
                <IconButton
                  onClick={handleNextImage}
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'rgba(255, 255, 255, 0.7)',
                    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' },
                  }}
                  size="small"
                >
                  <ChevronRightIcon />
                </IconButton>
              </>
            )}
            <Box 
              sx={{ 
                position: 'absolute', 
                bottom: 8, 
                left: 8, 
                bgcolor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                px: 1,
                py: 0.5,
                borderRadius: 1,
                fontSize: '0.75rem',
              }}
            >
              {`${currentImageIndex + 1} / ${prop.images.length}`}
            </Box>
          </Box>

          {/* Property details */}
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" color="primary" fontWeight="bold">
                  {formatPrice(prop.price)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {prop.location}
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {prop.title}
                </Typography>
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 2, maxHeight: 100, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {prop.description}
              </Typography>

              <Grid container spacing={1} sx={{ mb: 2 }}>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <BedroomChildIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                    <Typography variant="body2">{prop.bedrooms} Recámaras</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <BathtubIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                    <Typography variant="body2">{prop.bathrooms} Baños</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <SquareFootIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                    <Typography variant="body2">{prop.landArea}m² Terreno</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <SquareFootIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                    <Typography variant="body2">{prop.constructionArea}m² Construcción</Typography>
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                {prop.features.map((feature, index) => (
                  <Chip 
                    key={index} 
                    label={feature} 
                    size="small" 
                    variant="outlined"
                    sx={{ fontSize: '0.7rem' }}
                  />
                ))}
              </Box>

              <Divider sx={{ my: 1 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ mr: 1 }}>Publicado por:</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      component="img"
                      src={prop.publisherLogo}
                      alt={prop.publisher}
                      sx={{ width: 30, height: 30, mr: 1, borderRadius: '50%' }}
                    />
                    <Typography variant="body2" fontWeight="medium">
                      {prop.publisher}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mt: { xs: 1, sm: 0 } }}>
                  <Typography variant="body2" sx={{ mr: 1 }}>Compartir:</Typography>
                  <IconButton size="small" color="primary">
                    <FacebookIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" color="primary">
                    <TwitterIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" color="success">
                    <WhatsAppIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </CardContent>

            <Box sx={{ p: 2, pt: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
              <FormControlLabel
                control={
                  <Checkbox 
                    size="small" 
                    checked={!!isSelected}
                    onChange={handleCheckboxChange}
                  />
                }
                label="Selección para Descargar Información en PDF"
                sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.8rem' } }}
              />
              <Button 
                variant="contained" 
                color="primary" 
                size="small"
                startIcon={<PictureAsPdfIcon />}
                onClick={handleOpenPDFPreview}
                sx={{ mt: { xs: 1, sm: 0 } }}
              >
                PDF
              </Button>
            </Box>
          </Box>
        </Box>
      </Card>
      
      {/* PDF Preview Modal */}
      <PDFPreviewModal
        open={pdfPreviewOpen}
        onClose={handleClosePDFPreview}
        property={prop}
        title={`Vista previa: ${prop.title}`}
      />
    </>
  );
};

export default PropertyCard; 