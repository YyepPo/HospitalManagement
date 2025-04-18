import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  AppBar,
  Toolbar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  AccountCircle,
  Info,
  CalendarMonth,
} from '@mui/icons-material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { format, setHours, setMinutes } from 'date-fns';
import { 
  getSpecializations, 
  getDoctorsBySpecialization, 
  bookAppointment,
  getAppointments,
  updateAppointmentStatus
} from '../services/appointmentService';
import { getCurrentUser } from '../services/authService';

// Generate time slots from 9:00 to 19:00 with 30-minute intervals
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 9; hour < 19; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = format(setMinutes(setHours(new Date(), hour), minute), 'HH:mm');
      slots.push(time);
    }
  }
  return slots;
};

const timeSlots = generateTimeSlots();

const Appointment = () => {
  const navigate = useNavigate();
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [specializations, setSpecializations] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [appointments, setAppointments] = useState([]);
  
  const user = getCurrentUser();
  const isDoctor = user?.role === 'doctor';

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const specs = getSpecializations();
        setSpecializations(specs);
        
        if (isDoctor) {
          const doctorAppointments = getAppointments();
          setAppointments(doctorAppointments);
        }
        
        setError('');
      } catch (err) {
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    loadInitialData();
  }, [isDoctor]);

  useEffect(() => {
    if (selectedSpecialization) {
      const doctorsList = getDoctorsBySpecialization(selectedSpecialization);
      setDoctors(doctorsList);
    }
  }, [selectedSpecialization]);

  const handleSpecializationChange = (event) => {
    setSelectedSpecialization(event.target.value);
    setSelectedDoctor(null);
  };

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setOpenDialog(true);
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTime('');
  };

  const handleBookAppointment = async () => {
    try {
      if (!user) {
        navigate('/login');
        return;
      }

      const appointmentData = {
        doctorId: selectedDoctor.id,
        doctorName: selectedDoctor.name,
        doctorEmail: selectedDoctor.email,
        patientId: user.id,
        patientName: user.name,
        patientEmail: user.email,
        specialization: selectedDoctor.specialization,
        date: format(selectedDate, 'yyyy-MM-dd'),
        time: selectedTime,
        status: 'pending'
      };
      
      await bookAppointment(appointmentData);
      setBookingSuccess(true);
      setTimeout(() => {
        setOpenDialog(false);
        setBookingSuccess(false);
        setSelectedSpecialization('');
        setSelectedDoctor(null);
        setSelectedDate(new Date());
        setSelectedTime('');
      }, 2000);
    } catch (error) {
      setError('Failed to book appointment. Please try again.');
    }
  };

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      await updateAppointmentStatus(appointmentId, status);
      const updatedAppointments = appointments.map(app => 
        app.id === appointmentId ? { ...app, status } : app
      );
      setAppointments(updatedAppointments);
    } catch (error) {
      setError('Failed to update appointment status');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#29B6F6' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
            Spital Management
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              color="inherit"
              startIcon={<AccountCircle />}
              onClick={() => navigate('/myaccount')}
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

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {isDoctor ? (
          <>
            <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
              My Patient Appointments
            </Typography>
            <TableContainer component={Paper} elevation={3}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableCell><Typography variant="subtitle1" fontWeight="bold">Patient Name</Typography></TableCell>
                    <TableCell><Typography variant="subtitle1" fontWeight="bold">Date</Typography></TableCell>
                    <TableCell><Typography variant="subtitle1" fontWeight="bold">Time</Typography></TableCell>
                    <TableCell><Typography variant="subtitle1" fontWeight="bold">Status</Typography></TableCell>
                    <TableCell><Typography variant="subtitle1" fontWeight="bold">Actions</Typography></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {appointments.map((appointment) => (
                    <TableRow 
                      key={appointment.id}
                      sx={{ 
                        cursor: 'pointer',
                        '&:hover': { backgroundColor: '#f5f5f5' }
                      }}
                    >
                      <TableCell>{appointment.patientName}</TableCell>
                      <TableCell>{format(new Date(appointment.date), 'MMM dd, yyyy')}</TableCell>
                      <TableCell>{appointment.time}</TableCell>
                      <TableCell>{appointment.status}</TableCell>
                      <TableCell>
                        {appointment.status !== 'completed' && (
                          <Button
                            variant="contained"
                            color="success"
                            size="small"
                            onClick={() => handleUpdateStatus(appointment.id, 'completed')}
                          >
                            Complete
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <>
            <Typography variant="h4" gutterBottom align="center">
              Book an Appointment
            </Typography>

            <Box sx={{ mb: 4 }}>
              <FormControl fullWidth>
                <InputLabel id="specialization-label">Select Specialization</InputLabel>
                <Select
                  labelId="specialization-label"
                  value={selectedSpecialization}
                  label="Select Specialization"
                  onChange={handleSpecializationChange}
                >
                  {specializations.map((specialization) => (
                    <MenuItem key={specialization} value={specialization}>
                      {specialization}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {selectedSpecialization && (
              <Grid container spacing={4}>
                {doctors.map((doctor) => (
                  <Grid item xs={12} sm={6} md={4} key={doctor.id}>
                    <Card 
                      sx={{ 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column',
                        cursor: 'pointer',
                        transition: '0.3s',
                        '&:hover': {
                          transform: 'scale(1.02)',
                          boxShadow: 6,
                        },
                      }}
                      onClick={() => handleDoctorSelect(doctor)}
                    >
                      <CardMedia
                        component="img"
                        height="200"
                        image={doctor.image}
                        alt={doctor.name}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {doctor.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Specialization: {doctor.specialization}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Experience: {doctor.experience}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </>
        )}
      </Container>

      {/* Booking Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          Book Appointment with {selectedDoctor?.name}
        </DialogTitle>
        <DialogContent>
          {bookingSuccess ? (
            <Alert severity="success" sx={{ mt: 2 }}>
              Appointment booked successfully!
            </Alert>
          ) : (
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <DateCalendar
                  value={selectedDate}
                  onChange={handleDateChange}
                  minDate={new Date()}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Available Time Slots
                </Typography>
                <Grid container spacing={1}>
                  {timeSlots.map((time) => (
                    <Grid item xs={6} sm={4} key={time}>
                      <Button
                        variant={selectedTime === time ? "contained" : "outlined"}
                        fullWidth
                        onClick={() => handleTimeSelect(time)}
                        sx={{ mb: 1 }}
                      >
                        {time}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleBookAppointment}
            variant="contained"
            disabled={!selectedDate || !selectedTime || bookingSuccess}
          >
            Book Appointment
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Appointment; 