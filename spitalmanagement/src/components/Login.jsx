import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { Home } from '@mui/icons-material';
import { login } from '../services/authService';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login attempt with:', formData);
    
    try {
      if (!formData.email || !formData.password) {
        throw new Error('Please enter both email and password');
      }
      
      const user = await login(formData.email, formData.password);
      console.log('Login successful:', user);
      
      // Check if user data is properly returned
      if (!user || !user.role) {
        throw new Error('Invalid user data received');
      }
      
      // Redirect based on user role
      switch (user.role) {
        case 'admin':
          console.log('Redirecting to admin dashboard...');
          navigate('/myaccount');
          break;
        case 'doctor':
          console.log('Redirecting to doctor dashboard...');
          navigate('/doctor-dashboard');
          break;
        case 'patient':
          console.log('Redirecting to patient dashboard...');
          navigate('/myaccount');
          break;
        default:
          console.log('Redirecting to default dashboard...');
          navigate('/myaccount');
      }
    } catch (error) {
      console.error('Login error:', error.message);
      setError(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const testAccounts = [
    { email: 'john@example.com', role: 'Admin' },
    { email: 'smith@example.com', role: 'Doctor' },
    { email: 'jane@example.com', role: 'Patient' },
  ];

  const handleUseTestAccount = (email) => {
    setFormData(prev => ({
      ...prev,
      email
    }));
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Button
          variant="outlined"
          startIcon={<Home />}
          onClick={() => navigate('/')}
          sx={{ mb: 3, alignSelf: 'flex-start' }}
        >
          Back to Home
        </Button>

        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Login
          </Typography>
          
          <Alert severity="info" sx={{ mb: 3 }}>
            This is a demo application. You can use any of the test accounts below to login.
          </Alert>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                Don't have an account?
              </Typography>
              <Typography
                variant="body2"
                color="primary"
                sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                onClick={() => navigate('/register')}
              >
                Register here
              </Typography>
            </Box>
          </form>

          <Divider sx={{ my: 3 }}>Test Accounts</Divider>
          
          <List>
            {testAccounts.map((account, index) => (
              <ListItem key={index} sx={{ pl: 0 }}>
                <ListItemText
                  primary={account.email}
                  secondary={`Role: ${account.role}`}
                />
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleUseTestAccount(account.email)}
                >
                  Use This Account
                </Button>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login; 