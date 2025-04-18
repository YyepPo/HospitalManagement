import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Paper,
  Typography,
  Container,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  OutlinedInput,
  Chip,
  Grid,
} from '@mui/material';
import { Home } from '@mui/icons-material';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    city: '',
    bloodCategory: '',
    phoneNumber: '',
    weight: '',
    height: '',
    allergies: [],
  });

  const kosovoCity = [
    'Pristina',
    'Prizren',
    'Peja',
    'Mitrovica',
    'Gjakova',
    'Gjilan',
    'Ferizaj',
    'Deçan',
    'Dragash',
    'Istog',
    'Kaçanik',
    'Klina',
    'Fushë Kosovë',
    'Kamenica',
    'Malisheva',
    'Viti',
  ];

  const bloodCategories = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const allergiesList = [
    'Pollen',
    'Dust',
    'Pet Dander',
    'Mold',
    'Food Allergies',
    'Medications',
    'Insect Stings',
    'Latex',
    'None'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration data:', formData);
    // Add registration logic here
    navigate('/login'); // Redirect to login after registration
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAllergiesChange = (event) => {
    const { value } = event.target;
    setFormData(prev => ({
      ...prev,
      allergies: typeof value === 'string' ? value.split(',') : value,
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
            Register
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  label="First Name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="surname"
                  required
                  fullWidth
                  label="Last Name"
                  value={formData.surname}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>City</InputLabel>
                  <Select
                    name="city"
                    value={formData.city}
                    onChange={handleSelectChange}
                    label="City"
                  >
                    {kosovoCity.map((city) => (
                      <MenuItem key={city} value={city}>
                        {city}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Blood Type</InputLabel>
                  <Select
                    name="bloodCategory"
                    value={formData.bloodCategory}
                    onChange={handleSelectChange}
                    label="Blood Type"
                  >
                    {bloodCategories.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="phoneNumber"
                  fullWidth
                  label="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="weight"
                  fullWidth
                  label="Weight (kg)"
                  type="number"
                  value={formData.weight}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="height"
                  fullWidth
                  label="Height (cm)"
                  type="number"
                  value={formData.height}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Allergies</InputLabel>
                  <Select
                    multiple
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleAllergiesChange}
                    input={<OutlinedInput label="Allergies" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                  >
                    {allergiesList.map((allergy) => (
                      <MenuItem key={allergy} value={allergy}>
                        {allergy}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                Already have an account?
              </Typography>
              <Typography
                variant="body2"
                color="primary"
                sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                onClick={() => navigate('/login')}
              >
                Sign in here
              </Typography>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register; 