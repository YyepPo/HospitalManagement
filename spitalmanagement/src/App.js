import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Login.jsx';
import Register from './components/Register';
import Appointment from './pages/Appointment';
import MyAccount from './pages/MyAccount';
import AboutUs from './pages/AboutUs';
import DoctorDashboard from './pages/DoctorDashboard';
import { isAuthenticated, getCurrentUser } from './services/authService';
import './App.css';

// Protected Route component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const user = getCurrentUser();
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/myaccount" />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/about" element={<AboutUs />} />
          <Route 
            path="/myaccount" 
            element={
              <ProtectedRoute>
                <MyAccount />
              </ProtectedRoute>
            } 
          />
          <Route
            path="/doctor-dashboard"
            element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <DoctorDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 