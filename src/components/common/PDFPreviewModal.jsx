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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import { generatePropertyPDF } from '../../utils/pdfGenerator';

const PDFPreviewModal = ({ open, onClose, property, title = 'Vista previa de PDF' }) => {
  const [loading, setLoading] = useState(true);
  const [pdfUrl, setPdfUrl] = useState('');
  const [error, setError] = useState(null);
  const [pdf, setPdf] = useState(null);

  useEffect(() => {
    if (open && property) {
      setLoading(true);
      setError(null);
      
      // Generate PDF for preview
      generatePropertyPDF(property)
        .then((generatedPdf) => {
          // Store PDF for later download
          setPdf(generatedPdf);
          
          // Create a URL to preview
          const blobUrl = URL.createObjectURL(generatedPdf.output('blob'));
          setPdfUrl(blobUrl);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error generating PDF preview:', err);
          setError('Hubo un error al generar la vista previa del PDF.');
          setLoading(false);
        });
    }
    
    // Cleanup function
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [open, property]);
  
  const handleDownload = () => {
    if (pdf && property) {
      pdf.save(`Inmobidata-Propiedad-${property.id}.pdf`);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      aria-labelledby="pdf-preview-dialog-title"
    >
      <DialogTitle id="pdf-preview-dialog-title" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {title}
        <IconButton aria-label="close" onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent dividers sx={{ height: '70vh', position: 'relative' }}>
        {loading && (
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">
            <CircularProgress />
            <Typography variant="body2" sx={{ mt: 2 }}>
              Generando vista previa...
            </Typography>
          </Box>
        )}
        
        {error && (
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">
            <Typography color="error">{error}</Typography>
          </Box>
        )}
        
        {!loading && !error && (
          <Box height="100%" width="100%">
            <iframe 
              src={pdfUrl} 
              title="PDF Preview" 
              width="100%" 
              height="100%" 
              style={{ border: 'none' }}
            />
          </Box>
        )}
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Cerrar
        </Button>
        <Button 
          onClick={handleDownload} 
          variant="contained" 
          color="primary" 
          startIcon={<DownloadIcon />}
          disabled={loading || error}
        >
          Descargar PDF
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PDFPreviewModal; 