import React, { useState } from 'react';
import {
  Box,
  TextField,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchForm = ({ onSearch }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [searchParams, setSearchParams] = useState({
    estado: '',
    municipio: '',
    zona: '',
    colonia: '',
    tipo: '',
    precioMin: '',
    precioMax: '',
    id: '',
    mts2Terreno: '',
    mts2Construccion: '',
    recamaras: '',
    banos: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchParams);
    }
  };

  return (
    <Paper 
      component="form" 
      onSubmit={handleSubmit}
      elevation={1}
      sx={{ 
        p: 3, 
        borderRadius: 2,
        background: '#f0f8ff',
        mb: 4
      }}
    >
      <Box sx={{ mb: 1, typography: 'subtitle1', fontWeight: 'bold' }}>
        {isMobile ? 'BUSCADOR' : 'BUSCADOR'}
      </Box>
      <Grid container spacing={2}>
        {/* First row */}
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Estado"
            name="estado"
            value={searchParams.estado}
            onChange={handleChange}
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Municipio"
            name="municipio"
            value={searchParams.municipio}
            onChange={handleChange}
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Zona"
            name="zona"
            value={searchParams.zona}
            onChange={handleChange}
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Colonia"
            name="colonia"
            value={searchParams.colonia}
            onChange={handleChange}
            variant="outlined"
            size="small"
          />
        </Grid>

        {/* Second row */}
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Comprar o Renta</InputLabel>
            <Select
              name="tipo"
              value={searchParams.tipo}
              onChange={handleChange}
              label="Comprar o Renta"
            >
              <MenuItem value="comprar">Comprar</MenuItem>
              <MenuItem value="renta">Renta</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Precio Mínimo"
            name="precioMin"
            type="number"
            value={searchParams.precioMin}
            onChange={handleChange}
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Precio Máximo"
            name="precioMax"
            type="number"
            value={searchParams.precioMax}
            onChange={handleChange}
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="ID"
            name="id"
            value={searchParams.id}
            onChange={handleChange}
            variant="outlined"
            size="small"
          />
        </Grid>

        {/* Third row */}
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Mts2 de Terreno"
            name="mts2Terreno"
            type="number"
            value={searchParams.mts2Terreno}
            onChange={handleChange}
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Mts2 de Construcción"
            name="mts2Construccion"
            type="number"
            value={searchParams.mts2Construccion}
            onChange={handleChange}
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="# de Recamaras"
            name="recamaras"
            type="number"
            value={searchParams.recamaras}
            onChange={handleChange}
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="# de Baños"
            name="banos"
            type="number"
            value={searchParams.banos}
            onChange={handleChange}
            variant="outlined"
            size="small"
          />
        </Grid>
      </Grid>

      {/* Search button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<SearchIcon />}
          sx={{ 
            borderRadius: '50%',
            minWidth: '50px',
            width: '50px',
            height: '50px',
            p: 0,
            '& .MuiSvgIcon-root': {
              margin: 0
            }
          }}
        >
          <span style={{ display: 'none' }}>Buscar</span>
        </Button>
      </Box>
    </Paper>
  );
};

export default SearchForm; 