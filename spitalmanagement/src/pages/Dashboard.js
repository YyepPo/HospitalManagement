import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import {
  EventNote,
  AccountCircle,
  Info,
  ContactSupport,
  Dashboard as DashboardIcon,
  MedicalServices,
  Assignment,
} from '@mui/icons-material';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const navigate = useNavigate();

  const navigationButtons = [
    { title: 'Book Appointment', icon: <EventNote fontSize="large" />, path: '/appointment', color: '#2196f3' },
    { title: 'Medical Records', icon: <MedicalServices fontSize="large" />, path: '/medical-records', color: '#4caf50' },
    { title: 'Prescriptions', icon: <Assignment fontSize="large" />, path: '/prescriptions', color: '#ff9800' },
    { title: 'My Account', icon: <AccountCircle fontSize="large" />, path: '/profile', color: '#9c27b0' },
    { title: 'About Us', icon: <Info fontSize="large" />, path: '/about', color: '#f44336' },
    { title: 'Contact Us', icon: <ContactSupport fontSize="large" />, path: '/contact', color: '#795548' },
  ];

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 4, mb: 4, textAlign: 'center', background: 'linear-gradient(to right, #2196f3, #1976d2)' }}>
          <Typography component="h1" variant="h3" sx={{ color: 'white', mb: 2 }}>
            Welcome to Spital Management System
          </Typography>
          <Typography variant="h6" sx={{ color: 'white', opacity: 0.9 }}>
            Your Healthcare Journey Starts Here
          </Typography>
        </Paper>

        <Grid container spacing={3}>
          {navigationButtons.map((button) => (
            <Grid item xs={12} sm={6} md={4} key={button.path}>
              <Card 
                sx={{ 
                  height: '100%',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 3,
                  },
                  cursor: 'pointer',
                }}
                onClick={() => navigate(button.path)}
              >
                <CardContent sx={{ 
                  textAlign: 'center',
                  p: 4,
                }}>
                  <Box sx={{ 
                    mb: 2,
                    color: button.color,
                    transform: 'scale(1.5)',
                  }}>
                    {button.icon}
                  </Box>
                  <Typography variant="h5" component="h2" sx={{ mb: 1 }}>
                    {button.title}
                  </Typography>
                  <Button 
                    variant="contained" 
                    sx={{ 
                      mt: 2,
                      backgroundColor: button.color,
                      '&:hover': {
                        backgroundColor: button.color,
                        opacity: 0.9,
                      },
                    }}
                    onClick={() => navigate(button.path)}
                  >
                    Access Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard; 