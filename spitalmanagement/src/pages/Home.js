import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import {
  AccountCircle,
  Info,
  CalendarMonth,
  Person,
  MedicalServices,
  LocalHospital,
  AccessTime,
} from '@mui/icons-material';
import { isAuthenticated } from '../services/authService';

const Home = () => {
  const navigate = useNavigate();

  const handleMyAccountClick = () => {
    if (isAuthenticated()) {
      navigate('/myaccount');
    } else {
      navigate('/login');
    }
  };

  const features = [
    {
      icon: <MedicalServices fontSize="large" color="primary" />,
      title: 'Expert Medical Care',
      description: 'Access to qualified healthcare professionals',
    },
    {
      icon: <LocalHospital fontSize="large" color="primary" />,
      title: 'Specialized Treatments',
      description: 'Wide range of medical specializations',
    },
    {
      icon: <AccessTime fontSize="large" color="primary" />,
      title: 'Easy Scheduling',
      description: 'Book appointments at your convenience',
    },
  ];

  return (
    <>
      {/* Main Navigation Bar */}
      <AppBar position="static" sx={{ backgroundColor: '#29B6F6' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
            Spital Management
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              color="inherit"
              startIcon={<AccountCircle />}
              onClick={handleMyAccountClick}
            >
              MY ACCOUNT
            </Button>
            <Button
              color="inherit"
              startIcon={<CalendarMonth />}
              onClick={() => navigate('/appointment')}
            >
              APPOINTMENT
            </Button>
            <Button
              color="inherit"
              startIcon={<Info />}
              onClick={() => navigate('/about')}
            >
              ABOUT US
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: '#e3f2fd',
          pt: 8,
          pb: 6,
          backgroundImage: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            component="h1"
            variant="h2"
            color="primary"
            gutterBottom
            sx={{ fontWeight: 'bold', textAlign: 'center' }}
          >
            Welcome to Spital Management
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            paragraph
            sx={{ textAlign: 'center', mb: 4 }}
          >
            Your trusted healthcare management system
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/appointment')}
              sx={{ mr: 2 }}
            >
              Book Appointment
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={handleMyAccountClick}
            >
              My Account
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Box sx={{ mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Home; 