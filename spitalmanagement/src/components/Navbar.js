import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
  IconButton,
} from '@mui/material';
import {
  AccountCircle,
  ExpandMore,
  Person,
  EventNote,
} from '@mui/icons-material';

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Add logout logic here
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ bgcolor: '#29B6F6' }}>
      <Toolbar>
        <Typography 
          variant="h6" 
          component={Link} 
          to="/" 
          sx={{ 
            flexGrow: 1, 
            color: 'white', 
            textDecoration: 'none',
            fontWeight: 'bold'
          }}
        >
          Spital Management
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            color="inherit"
            component={Link}
            to="/myaccount"
            startIcon={<Person />}
          >
            MY ACCOUNT
          </Button>
          
          <Button
            color="inherit"
            component={Link}
            to="/appointment"
            startIcon={<EventNote />}
          >
            APPOINTMENT
          </Button>

          <Button
            color="inherit"
            component={Link}
            to="/about"
          >
            ABOUT US
          </Button>

          <IconButton
            color="inherit"
            onClick={handleMenu}
            sx={{ ml: 1 }}
          >
            <AccountCircle />
            <ExpandMore />
          </IconButton>
          
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem component={Link} to="/profile" onClick={handleClose}>
              My Profile
            </MenuItem>
            <MenuItem component={Link} to="/settings" onClick={handleClose}>
              Settings
            </MenuItem>
            <MenuItem onClick={() => { handleClose(); handleLogout(); }}>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 