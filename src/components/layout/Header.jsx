import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box, useMediaQuery, useTheme, IconButton, Drawer, List, ListItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import InmobidataLogo from '../../assets/inmobidata-logo';

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const navItems = [
    { name: 'HERRAMIENTAS', path: '/' },
    { name: 'DATOS HISTÓRICOS', path: '/historical-data' },
    { name: 'ACERCA DE INMOBIDATA', path: '/about' },
    { name: 'CONTACTO', path: '/contact' },
  ];

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#f5f5f5', boxShadow: 'none', color: 'black' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <InmobidataLogo width="60" height="40" />
            <Box sx={{ typography: 'h6', fontWeight: 'bold', ml: 1, color: '#333' }}>
              INMOBIDATA
            </Box>
          </Link>
        </Box>

        {isMobile ? (
          <>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer}
            >
              <List sx={{ width: 250 }}>
                {navItems.map((item) => (
                  <ListItem key={item.name} onClick={toggleDrawer}>
                    <Link 
                      to={item.path} 
                      style={{ 
                        textDecoration: 'none', 
                        color: '#333',
                        width: '100%'
                      }}
                    >
                      {item.name}
                    </Link>
                  </ListItem>
                ))}
                <ListItem onClick={toggleDrawer}>
                  <Button 
                    variant="contained" 
                    component={Link} 
                    to="/premium"
                    sx={{ 
                      bgcolor: '#FFA726', 
                      '&:hover': { bgcolor: '#FB8C00' },
                      width: '100%' 
                    }}
                  >
                    PREMIUM
                  </Button>
                </ListItem>
              </List>
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: 'flex', gap: 2 }}>
            {navItems.map((item) => (
              <Button 
                key={item.name} 
                component={Link} 
                to={item.path}
                sx={{ 
                  color: '#fff', 
                  bgcolor: '#2196F3',
                  '&:hover': { bgcolor: '#1976D2' },
                  borderRadius: '20px',
                  px: 2
                }}
              >
                {item.name}
              </Button>
            ))}
            <Button 
              variant="contained" 
              component={Link} 
              to="/premium"
              sx={{ 
                bgcolor: '#FFA726', 
                '&:hover': { bgcolor: '#FB8C00' },
                borderRadius: '20px',
                px: 2
              }}
            >
              PREMIUM
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header; 