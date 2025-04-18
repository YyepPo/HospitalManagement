import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Card,
  CardContent,
  Divider,
  Alert,
  IconButton,
} from '@mui/material';
import {
  Email,
  Phone,
  LocationOn,
  MedicalServices,
  Schedule,
  Security,
  Send,
} from '@mui/icons-material';

const AboutUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setSubmitStatus('success');
    setFormData({ name: '', email: '', message: '' });
  };

  const features = [
    {
      icon: <MedicalServices fontSize="large" color="primary" />,
      title: 'Expert Healthcare',
      description: 'Access to qualified healthcare professionals across various specializations.',
    },
    {
      icon: <Schedule fontSize="large" color="primary" />,
      title: 'Easy Scheduling',
      description: 'Book appointments online 24/7 with your preferred healthcare provider.',
    },
    {
      icon: <Security fontSize="large" color="primary" />,
      title: 'Secure Platform',
      description: 'Your health information is protected with state-of-the-art security measures.',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* About Us Section */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          About Our Hospital Management System
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" paragraph sx={{ mb: 6 }}>
          Revolutionizing healthcare management with modern technology and patient-centered care
        </Typography>
        
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
                <Box sx={{ p: 2, bgcolor: 'primary.light', borderRadius: '50%', mb: 2 }}>
                  {feature.icon}
                </Box>
                <CardContent>
                  <Typography variant="h6" component="h2" align="center" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" align="center">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Paper elevation={3} sx={{ p: 4, bgcolor: 'background.paper' }}>
          <Typography variant="h5" gutterBottom color="primary.main">
            Our Mission
          </Typography>
          <Typography paragraph>
            We strive to provide the most efficient and user-friendly hospital management system that connects patients with healthcare providers seamlessly. Our platform streamlines the entire healthcare process, from appointment booking to medical record management.
          </Typography>
          
          <Typography variant="h5" gutterBottom color="primary.main" sx={{ mt: 4 }}>
            How It Works
          </Typography>
          <Typography paragraph>
            1. Register an account as a patient or healthcare provider
          </Typography>
          <Typography paragraph>
            2. Browse through available specializations and doctors
          </Typography>
          <Typography paragraph>
            3. Book appointments at your convenient time
          </Typography>
          <Typography paragraph>
            4. Manage your medical records and appointments in one place
          </Typography>
          <Typography paragraph>
            5. Receive notifications and reminders for upcoming appointments
          </Typography>
        </Paper>
      </Box>

      <Divider sx={{ my: 8 }} />

      {/* Contact Us Section */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 6 }}>
          Get in Touch
        </Typography>

        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h6" gutterBottom color="primary.main">
                Contact Information
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <IconButton color="primary">
                  <Email />
                </IconButton>
                <Typography>support@hospitalmanagementsystem.com</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <IconButton color="primary">
                  <Phone />
                </IconButton>
                <Typography>+1 (555) 123-4567</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton color="primary">
                  <LocationOn />
                </IconButton>
                <Typography>123 Healthcare Street, Medical City, MC 12345</Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h6" gutterBottom color="primary.main">
                Send us a Message
              </Typography>
              
              {submitStatus === 'success' && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  Thank you for your message! We'll get back to you soon.
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Message"
                  name="message"
                  multiline
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  margin="normal"
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  endIcon={<Send />}
                  sx={{ mt: 2 }}
                  fullWidth
                >
                  Send Message
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AboutUs; 