import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Layout from './components/layout/Layout';
import SearchPage from './pages/SearchPage';
import HistoricalDataPage from './pages/HistoricalDataPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PremiumPage from './pages/PremiumPage';
import './App.css';

// Custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2196F3', // Blue
    },
    secondary: {
      main: '#FFA726', // Orange
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 4,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/historical-data" element={<HistoricalDataPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/premium" element={<PremiumPage />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
