// Mock appointments data
const mockAppointments = [
  {
    id: 1,
    patientName: 'Jane Patient',
    patientEmail: 'jane@example.com',
    doctorName: 'Dr. Smith',
    doctorEmail: 'smith@example.com',
    specialization: 'Cardiology',
    date: new Date().toISOString().split('T')[0], // Today
    time: '10:00 AM',
    status: 'pending'
  },
  {
    id: 2,
    patientName: 'John Wilson',
    patientEmail: 'john@example.com',
    doctorName: 'Dr. Smith',
    doctorEmail: 'smith@example.com',
    specialization: 'Cardiology',
    date: new Date().toISOString().split('T')[0], // Today
    time: '11:30 AM',
    status: 'confirmed'
  },
  {
    id: 3,
    patientName: 'Sarah Johnson',
    patientEmail: 'sarah@example.com',
    doctorName: 'Dr. Smith',
    doctorEmail: 'smith@example.com',
    specialization: 'Cardiology',
    date: new Date().toISOString().split('T')[0], // Today
    time: '2:00 PM',
    status: 'completed'
  },
  {
    id: 4,
    patientName: 'Michael Brown',
    patientEmail: 'michael@example.com',
    doctorName: 'Dr. Smith',
    doctorEmail: 'smith@example.com',
    specialization: 'Cardiology',
    date: (() => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow.toISOString().split('T')[0];
    })(), // Tomorrow
    time: '9:30 AM',
    status: 'pending'
  },
  {
    id: 5,
    patientName: 'Emily Davis',
    patientEmail: 'emily@example.com',
    doctorName: 'Dr. Smith',
    doctorEmail: 'smith@example.com',
    specialization: 'Cardiology',
    date: (() => {
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      return nextWeek.toISOString().split('T')[0];
    })(), // Next week
    time: '3:30 PM',
    status: 'confirmed'
  }
];

// Mock doctors data with their schedules
const mockDoctors = {
  Dentist: [
    {
      id: 1,
      name: 'Dr. Johnson',
      email: 'johnson@example.com',
      specialization: 'Dentist',
      experience: '10 years',
      image: 'doctor1.jpg'
    }
  ],
  Cardiology: [
    {
      id: 2,
      name: 'Dr. Smith',
      email: 'smith@example.com',
      specialization: 'Cardiology',
      experience: '15 years',
      image: 'doctor2.jpg'
    }
  ],
  // ... other specializations
};

export const getSpecializations = () => {
  return Object.keys(mockDoctors);
};

export const getDoctorsBySpecialization = (specialization) => {
  return mockDoctors[specialization] || [];
};

export const getAppointments = () => {
  return mockAppointments;
};

export const bookAppointment = (appointmentData) => {
  const newAppointment = {
    id: mockAppointments.length + 1,
    ...appointmentData,
    status: 'pending'
  };
  mockAppointments.push(newAppointment);
  return newAppointment;
};

export const updateAppointmentStatus = (appointmentId, newStatus) => {
  const appointmentIndex = mockAppointments.findIndex(app => app.id === appointmentId);
  if (appointmentIndex === -1) {
    throw new Error('Appointment not found');
  }
  
  mockAppointments[appointmentIndex] = {
    ...mockAppointments[appointmentIndex],
    status: newStatus
  };
  
  return mockAppointments[appointmentIndex];
};

export const removeAppointment = (appointmentId) => {
  const appointmentIndex = mockAppointments.findIndex(app => app.id === appointmentId);
  if (appointmentIndex === -1) {
    throw new Error('Appointment not found');
  }
  
  mockAppointments.splice(appointmentIndex, 1);
};

export const getDoctorSchedule = (doctorId) => {
  // Mock schedule data
  return {
    workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    workingHours: {
      start: '09:00',
      end: '17:00'
    },
    appointments: mockAppointments.filter(app => 
      app.doctorEmail === mockDoctors.find(doc => doc.id === doctorId)?.email
    )
  };
}; 