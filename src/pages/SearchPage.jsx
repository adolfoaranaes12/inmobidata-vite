import React, { useState, useEffect } from 'react';
import { Typography, Box, Button, Snackbar, Alert } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import SearchForm from '../components/search/SearchForm';
import PropertyCard from '../components/search/PropertyCard';
import MultiPropertyPDFModal from '../components/common/MultiPropertyPDFModal';

// Mock data for demonstration
const mockProperties = [
  {
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
  },
  {
    id: '0000002',
    title: 'Casa en Venta en Carretera Nacional, Monterrey, NL',
    description: 'Casa en venta en Tamaulipas, con excelente ubicación y seguridad las 24 horas. Esta propiedad cuenta con 3 recámaras más una con su baño y walk-in closet, 2 cajones de estacionamiento, patio con acceso a jardín privado de la colonia, cuarto de servicio, cocina equipada, cisterna, portón automatizado. Con una antigüedad de 20 años, en 200m2 de terreno con 7.5 metros de frente y 241 metros de construcción. Esta casa es ideal para una familia que busca comodidad y tranquilidad.',
    price: 13450000,
    location: 'Colonia Las Fresnos, Monterrey, NL',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    ],
    bedrooms: 4,
    bathrooms: 3,
    landArea: 250,
    constructionArea: 280,
    features: ['Alberca', 'Jardín', 'Seguridad', 'Estacionamiento', 'Amueblado parcialmente'],
    publisher: 'Eduardo Ibarra',
    contact: 'XXXXXXXXXX',
    publisherLogo: 'https://via.placeholder.com/50',
  }
];

const SearchPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({});
  const [selectedProperties, setSelectedProperties] = useState({});
  const [multiPdfModalOpen, setMultiPdfModalOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  // Mock API call to fetch properties
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProperties(mockProperties);
      setLoading(false);
    }, 500);
  }, []);

  const handleSearch = (params) => {
    // Save search parameters
    setSearchParams(params);
    setLoading(true);

    // Simulate API search with a delay
    setTimeout(() => {
      // For demonstration, just returning the mock data
      // In a real application, you would filter based on params
      setProperties(mockProperties);
      setLoading(false);
      
      // Clear selections when new search is performed
      setSelectedProperties({});
    }, 500);
  };

  const handlePropertySelect = (property, isSelected) => {
    setSelectedProperties(prev => {
      const newSelections = { ...prev };
      
      if (isSelected) {
        newSelections[property.id] = property;
      } else {
        delete newSelections[property.id];
      }
      
      return newSelections;
    });
  };
  
  const handleOpenMultiPdfModal = () => {
    const selectedPropertiesList = Object.values(selectedProperties);
    
    if (selectedPropertiesList.length === 0) {
      setSnackbar({
        open: true,
        message: 'Por favor, seleccione al menos una propiedad para generar el PDF.',
        severity: 'warning',
      });
      return;
    }
    
    setMultiPdfModalOpen(true);
  };
  
  const handleCloseMultiPdfModal = () => {
    setMultiPdfModalOpen(false);
  };
  
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  const selectedCount = Object.keys(selectedProperties).length;
  const selectedPropertiesList = Object.values(selectedProperties);

  return (
    <Box>
      {/* Search Form */}
      <SearchForm onSearch={handleSearch} />

      {/* Results header with actions */}
      <Box mb={3} display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
        <Typography variant="h6" fontWeight="bold">
          {loading ? 'Buscando propiedades...' : `Resultados (${properties.length})`}
        </Typography>
        
        {selectedCount > 0 && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<PictureAsPdfIcon />}
            onClick={handleOpenMultiPdfModal}
            sx={{ mt: { xs: 1, sm: 0 } }}
          >
            Descargar {selectedCount} {selectedCount === 1 ? 'propiedad' : 'propiedades'} en PDF
          </Button>
        )}
      </Box>

      {/* Property Listings */}
      <Box>
        {loading ? (
          <Typography>Cargando...</Typography>
        ) : properties.length > 0 ? (
          properties.map((property) => (
            <PropertyCard 
              key={property.id} 
              property={property}
              onSelect={handlePropertySelect}
              isSelected={selectedProperties[property.id]}
            />
          ))
        ) : (
          <Typography>No se encontraron propiedades con los criterios seleccionados.</Typography>
        )}
      </Box>
      
      {/* Multiple Properties PDF Modal */}
      <MultiPropertyPDFModal
        open={multiPdfModalOpen}
        onClose={handleCloseMultiPdfModal}
        properties={selectedPropertiesList}
      />
      
      {/* Feedback Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SearchPage; 