import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Avatar,
  Chip,
  AppBar,
  Toolbar,
  Stack,
} from '@mui/material';
import {
  CalendarToday,
  AccessTime,
  Person,
  Event,
  ExitToApp,
  AccountCircle,
} from '@mui/icons-material';
import { getAppointments, updateAppointmentStatus, removeAppointment } from '../services/appointmentService';
import { getCurrentUser, logout } from '../services/authService';
import PatientDetails from '../components/PatientDetails';
import { format } from 'date-fns';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientDetailsOpen, setPatientDetailsOpen] = useState(false);
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const user = getCurrentUser();

  useEffect(() => {
    const loadAppointments = () => {
      const allAppointments = getAppointments().filter(
        app => app.doctorEmail === user?.email
      );
      setAppointments(allAppointments);

      // Filter today's appointments
      const today = new Date().toISOString().split('T')[0];
      const todayAppts = allAppointments.filter(apt => apt.date === today);
      setTodayAppointments(todayAppts);

      // Filter upcoming appointments (future dates)
      const upcoming = allAppointments.filter(apt => apt.date > today);
      setUpcomingAppointments(upcoming);
    };

    loadAppointments();
  }, [user?.email]);

  const handlePatientClick = (appointment) => {
    setSelectedPatient(appointment);
    setPatientDetailsOpen(true);
  };

  const handleAcceptAppointment = async (appointmentId) => {
    try {
      await updateAppointmentStatus(appointmentId, 'confirmed');
      // Refresh appointments after update
      const allAppointments = getAppointments().filter(
        app => app.doctorEmail === user?.email
      );
      setAppointments(allAppointments);
      
      const today = new Date().toISOString().split('T')[0];
      setTodayAppointments(allAppointments.filter(apt => apt.date === today));
      setUpcomingAppointments(allAppointments.filter(apt => apt.date > today));
    } catch (error) {
      console.error('Error accepting appointment:', error);
    }
  };

  const handleCompleteAppointment = async (appointmentId) => {
    try {
      await updateAppointmentStatus(appointmentId, 'completed');
      // Refresh appointments after update
      const allAppointments = getAppointments().filter(
        app => app.doctorEmail === user?.email
      );
      setAppointments(allAppointments);
      
      const today = new Date().toISOString().split('T')[0];
      setTodayAppointments(allAppointments.filter(apt => apt.date === today));
      setUpcomingAppointments(allAppointments.filter(apt => apt.date > today));
    } catch (error) {
      console.error('Error completing appointment:', error);
    }
  };

  const handlePatientNotPresent = async (appointmentId) => {
    try {
      await removeAppointment(appointmentId);
      // Refresh appointments after removal
      const allAppointments = getAppointments().filter(
        app => app.doctorEmail === user?.email
      );
      setAppointments(allAppointments);
      
      const today = new Date().toISOString().split('T')[0];
      setTodayAppointments(allAppointments.filter(apt => apt.date === today));
      setUpcomingAppointments(allAppointments.filter(apt => apt.date > today));
    } catch (error) {
      console.error('Error removing appointment:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'primary';
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  const renderActionButtons = (appointment) => {
    switch (appointment.status) {
      case 'pending':
        return (
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => handleAcceptAppointment(appointment.id)}
            >
              Accept
            </Button>
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => handlePatientNotPresent(appointment.id)}
            >
              Patient Not Present
            </Button>
          </Stack>
        );
      case 'confirmed':
        return (
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={() => handleCompleteAppointment(appointment.id)}
            >
              Complete
            </Button>
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => handlePatientNotPresent(appointment.id)}
            >
              Patient Not Present
            </Button>
          </Stack>
        );
      case 'completed':
        return (
          <Chip
            label="Completed"
            color="success"
            size="small"
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#2979ff' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
            Doctor Dashboard
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: '#1565c0', mr: 1 }}>
                <AccountCircle />
              </Avatar>
              <Box>
                <Typography variant="subtitle2" sx={{ color: 'white' }}>
                  {user?.name || 'Doctor'}
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  {user?.email || 'doctor@example.com'}
                </Typography>
              </Box>
            </Box>
            <Button
              color="inherit"
              startIcon={<ExitToApp />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* Summary Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: 'primary.main', color: 'white' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6">Today's Appointments</Typography>
                  <CalendarToday />
                </Box>
                <Typography variant="h3" sx={{ mt: 2 }}>
                  {todayAppointments.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: 'success.main', color: 'white' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6">Upcoming</Typography>
                  <Event />
                </Box>
                <Typography variant="h3" sx={{ mt: 2 }}>
                  {upcomingAppointments.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: 'warning.main', color: 'white' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6">Total Patients</Typography>
                  <Person />
                </Box>
                <Typography variant="h3" sx={{ mt: 2 }}>
                  {appointments.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: 'info.main', color: 'white' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6">Hours Today</Typography>
                  <AccessTime />
                </Box>
                <Typography variant="h3" sx={{ mt: 2 }}>
                  8
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Today's Appointments */}
        <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3, color: 'primary.main' }}>
            Today's Appointments
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.100' }}>
                  <TableCell>Time</TableCell>
                  <TableCell>Patient</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {todayAppointments.map((appointment) => (
                  <TableRow key={appointment.id} hover>
                    <TableCell>{appointment.time}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          {appointment.patientName[0]}
                        </Avatar>
                        {appointment.patientName}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={appointment.status}
                        color={getStatusColor(appointment.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {renderActionButtons(appointment)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Upcoming Appointments */}
        <Paper sx={{ p: 3 }} elevation={3}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3, color: 'primary.main' }}>
            Upcoming Appointments
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.100' }}>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Patient</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {upcomingAppointments.map((appointment) => (
                  <TableRow key={appointment.id} hover>
                    <TableCell>{appointment.date}</TableCell>
                    <TableCell>{appointment.time}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          {appointment.patientName[0]}
                        </Avatar>
                        {appointment.patientName}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={appointment.status}
                        color={getStatusColor(appointment.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {renderActionButtons(appointment)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Patient Details Dialog */}
        <PatientDetails
          open={patientDetailsOpen}
          onClose={() => setPatientDetailsOpen(false)}
          patient={selectedPatient}
          isDoctor={true}
        />
      </Container>
    </>
  );
};

export default DoctorDashboard; 