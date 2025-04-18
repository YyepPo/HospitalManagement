import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  AppBar,
  Toolbar,
  Avatar,
  Chip,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format } from 'date-fns';
import { Person, ExitToApp } from '@mui/icons-material';
import { getCurrentUser, logout } from '../services/authService';
import { getAllUsers, updateUserRole } from '../services/userService';
import { getAppointments, getDoctorSchedule } from '../services/appointmentService';

// Helper function to capitalize role
const capitalizeRole = (role) => {
  return role.charAt(0).toUpperCase() + role.slice(1);
};

// Header Component
const Header = ({ user, onLogout }) => {
  const navigate = useNavigate();
  
  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return '#ff1744'; 
      case 'doctor':
        return '#2979ff'; 
      case 'patient':
        return '#00c853'; 
      case 'manager':
        return '#6200ea'; 
      default:
        return '#757575'; 
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black', boxShadow: 1, mb: 3 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
          My Account
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {user ? (
            <>
              <Chip
                label={capitalizeRole(user.role)}
                sx={{
                  backgroundColor: getRoleColor(user.role),
                  color: 'white',
                  fontWeight: 'bold',
                }}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar sx={{ bgcolor: getRoleColor(user.role) }}>
                  {user.name.charAt(0)}
                </Avatar>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                    {user.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {user.email}
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="outlined"
                color="inherit"
                startIcon={<ExitToApp />}
                onClick={onLogout}
                size="small"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/login')}
                size="small"
              >
                Login
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => navigate('/register')}
                size="small"
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

// Patient View Component
const PatientView = ({ user }) => {
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    // Fetch appointments for the current patient
    const patientAppointments = getAppointments().filter(
      app => app.patientEmail === user.email
    );
    setAppointments(patientAppointments);
  }, [user.email]);

  return (
    <>
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>Personal Information</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography><strong>Name:</strong> {user.name}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography><strong>Email:</strong> {user.email}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography><strong>Phone:</strong> {user.phone}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography><strong>Address:</strong> {user.address}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography><strong>Date of Birth:</strong> {user.dateOfBirth}</Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3, mt: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
            <Tab label="Upcoming Appointments" />
            <Tab label="Appointment History" />
          </Tabs>
        </Box>

        {activeTab === 0 && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Doctor</TableCell>
                  <TableCell>Specialization</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments
                  .filter(app => new Date(app.date) >= new Date() && app.status !== 'completed')
                  .map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>{appointment.doctorName}</TableCell>
                      <TableCell>{appointment.specialization}</TableCell>
                      <TableCell>{format(new Date(appointment.date), 'MMM dd, yyyy')}</TableCell>
                      <TableCell>{appointment.time}</TableCell>
                      <TableCell>
                        <Chip 
                          label={appointment.status}
                          color={appointment.status === 'confirmed' ? 'success' : 'warning'}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {activeTab === 1 && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Doctor</TableCell>
                  <TableCell>Specialization</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments
                  .filter(app => new Date(app.date) < new Date() || app.status === 'completed')
                  .map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>{appointment.doctorName}</TableCell>
                      <TableCell>{appointment.specialization}</TableCell>
                      <TableCell>{format(new Date(appointment.date), 'MMM dd, yyyy')}</TableCell>
                      <TableCell>{appointment.time}</TableCell>
                      <TableCell>
                        <Chip 
                          label={appointment.status}
                          color={appointment.status === 'completed' ? 'success' : 'error'}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </>
  );
};

// Doctor View Component
const DoctorView = ({ user }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch appointments for the current doctor
    const doctorAppointments = getAppointments().filter(
      app => app.doctorEmail === user.email
    );
    setAppointments(doctorAppointments);
  }, [user.email]);

  const handleCompleteAppointment = async (appointmentId) => {
    try {
      // Update the appointment status to completed
      const updatedAppointments = appointments.map(app => 
        app.id === appointmentId 
          ? { ...app, status: 'completed' }
          : app
      );
      setAppointments(updatedAppointments);
      // In a real application, you would make an API call here
      // await updateAppointmentStatus(appointmentId, 'completed');
    } catch (error) {
      console.error('Error completing appointment:', error);
    }
  };

  return (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>Today's Appointments</Typography>
        <DatePicker
          label="Select Date"
          value={selectedDate}
          onChange={(newValue) => setSelectedDate(newValue)}
          sx={{ mb: 2 }}
        />
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Patient Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments
              .filter(app => format(new Date(app.date), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd'))
              .map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>{appointment.patientName}</TableCell>
                  <TableCell>{format(new Date(appointment.date), 'MMM dd, yyyy')}</TableCell>
                  <TableCell>{appointment.time}</TableCell>
                  <TableCell>
                    <Chip 
                      label={appointment.status}
                      color={appointment.status === 'completed' ? 'success' : 
                             appointment.status === 'confirmed' ? 'primary' : 'warning'}
                    />
                  </TableCell>
                  <TableCell>
                    {appointment.status !== 'completed' && (
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() => handleCompleteAppointment(appointment.id)}
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
    </Paper>
  );
};

// Admin View Component
const AdminView = () => {
  const [openSchedule, setOpenSchedule] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [users, setUsers] = useState([]);
  const [schedule, setSchedule] = useState(null);

  useEffect(() => {
    setUsers(getAllUsers());
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUserRole(userId, newRole);
      setUsers(getAllUsers()); // Refresh the users list
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  const handleScheduleDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setSchedule(getDoctorSchedule(doctor.id));
    setOpenSchedule(true);
  };

  return (
    <>
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>User Management</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <FormControl size="small" fullWidth>
                      <Select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      >
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="doctor">Doctor</MenuItem>
                        <MenuItem value="patient">Patient</MenuItem>
                        <MenuItem value="manager">Manager</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    {user.role === 'doctor' && (
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleScheduleDoctor(user)}
                      >
                        Set Schedule
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog open={openSchedule} onClose={() => setOpenSchedule(false)} maxWidth="md" fullWidth>
        <DialogTitle>Set Doctor Schedule - {selectedDoctor?.name}</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Set Working Hours
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Start Time"
                  type="time"
                  defaultValue={schedule?.startTime || "09:00"}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="End Time"
                  type="time"
                  defaultValue={schedule?.endTime || "17:00"}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                  Working Days
                </Typography>
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                  <Button
                    key={day}
                    variant={schedule?.workingDays.includes(day) ? "contained" : "outlined"}
                    sx={{ m: 0.5 }}
                  >
                    {day}
                  </Button>
                ))}
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSchedule(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenSchedule(false)}>
            Save Schedule
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const MyAccount = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(getCurrentUser());

  useEffect(() => {
    const user = getCurrentUser();
    if (user?.role === 'doctor') {
      navigate('/doctor-dashboard');
    }
  }, [navigate]);

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate('/login');
  };

  // If user is not authenticated, show login/register prompt
  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8, textAlign: 'center' }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Please Login or Register
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            You need to be logged in to access this page
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/register')}
            >
              Register
            </Button>
          </Box>
        </Paper>
      </Container>
    );
  }

  // Render different views based on user role
  const renderContent = () => {
    switch (user.role) {
      case 'patient':
        return <PatientView user={user} />;
      case 'doctor':
        return <DoctorView user={user} />;
      case 'admin':
        return <AdminView />;
      default:
        return <Typography>Access Denied</Typography>;
    }
  };

  return (
    <>
      <Header user={user} onLogout={handleLogout} />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {renderContent()}
      </Container>
    </>
  );
};

export default MyAccount; 