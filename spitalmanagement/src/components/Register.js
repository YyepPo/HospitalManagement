import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
} from '@mui/material';

const Register = () => {
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
      allergies: value
    }));
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          marginTop: 8,
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'white',
          borderRadius: '8px',
        }}
      >
        <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
          Register
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="given-name"
            autoFocus
            value={formData.name}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="surname"
            label="Surname"
            name="surname"
            autoComplete="family-name"
            value={formData.surname}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>City</InputLabel>
            <Select
              name="city"
              value={formData.city}
              label="City"
              onChange={handleSelectChange}
              required
            >
              {kosovoCity.map((city) => (
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Blood Category</InputLabel>
            <Select
              name="bloodCategory"
              value={formData.bloodCategory}
              label="Blood Category"
              onChange={handleSelectChange}
              required
            >
              {bloodCategories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="normal"
            required
            fullWidth
            id="phoneNumber"
            label="Phone Number"
            name="phoneNumber"
            autoComplete="tel"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              required
              fullWidth
              id="weight"
              label="Weight (kg)"
              name="weight"
              type="number"
              value={formData.weight}
              onChange={handleInputChange}
              inputProps={{ min: 0, step: 0.1 }}
            />
            <TextField
              required
              fullWidth
              id="height"
              label="Height (cm)"
              name="height"
              type="number"
              value={formData.height}
              onChange={handleInputChange}
              inputProps={{ min: 0, step: 0.1 }}
            />
          </Box>
          <FormControl fullWidth sx={{ mb: 2 }}>
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              mb: 2,
              py: 1.5,
              backgroundColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#1565c0',
              },
            }}
          >
            REGISTER
          </Button>
          <Link 
            to="/login" 
            style={{ 
              textDecoration: 'none',
              color: '#1976d2',
              display: 'block',
              textAlign: 'center',
              marginTop: '16px',
            }}
          >
            ALREADY HAVE AN ACCOUNT? SIGN IN
          </Link>
        </form>
      </Paper>
    </Container>
  );
};

export default Register; 