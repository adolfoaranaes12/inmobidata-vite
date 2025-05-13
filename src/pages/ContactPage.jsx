import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Snackbar,
  Alert,
  MenuItem,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle the form submission to your backend
    console.log('Form submitted:', formData);
    
    // Show success message
    setSnackbar({
      open: true,
      message: '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.',
      severity: 'success',
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  const subjectOptions = [
    { value: 'info', label: 'Solicitar información' },
    { value: 'support', label: 'Soporte técnico' },
    { value: 'partnership', label: 'Propuesta de colaboración' },
    { value: 'feedback', label: 'Comentarios y sugerencias' },
    { value: 'other', label: 'Otro' },
  ];

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
        Contacto
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
              Envíanos un mensaje
            </Typography>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Nombre"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Teléfono"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    select
                    label="Asunto"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                  >
                    {subjectOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    multiline
                    rows={4}
                    label="Mensaje"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    endIcon={<SendIcon />}
                    sx={{ mt: 2 }}
                  >
                    Enviar Mensaje
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>

        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
              Información de Contacto
            </Typography>

            <Box sx={{ mb: 3, display: 'flex', alignItems: 'flex-start' }}>
              <EmailIcon color="primary" sx={{ mr: 2, mt: 0.5 }} />
              <Box>
                <Typography variant="subtitle1" fontWeight="medium">
                  Email
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  info@inmobidata.com
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mb: 3, display: 'flex', alignItems: 'flex-start' }}>
              <PhoneIcon color="primary" sx={{ mr: 2, mt: 0.5 }} />
              <Box>
                <Typography variant="subtitle1" fontWeight="medium">
                  Teléfono
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  +52 (81) 1234 5678
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
              <LocationOnIcon color="primary" sx={{ mr: 2, mt: 0.5 }} />
              <Box>
                <Typography variant="subtitle1" fontWeight="medium">
                  Dirección
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Av. Fundidora 501<br />
                  Col. Obrera<br />
                  Monterrey, Nuevo León, México<br />
                  CP 64010
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

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

export default ContactPage; 