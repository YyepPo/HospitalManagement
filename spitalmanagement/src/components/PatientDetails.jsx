import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  TextField,
  Box,
  Chip,
  IconButton,
  Paper,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';

const PatientDetails = ({ open, onClose, patient, isDoctor, onSaveNotes }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState(patient?.doctorNotes || '');

  const handleSaveNotes = () => {
    onSaveNotes(notes);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNotes(patient?.doctorNotes || '');
    setIsEditing(false);
  };

  if (!patient) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white' }}>
        Patient Details
      </DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            {patient.name}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <Chip
              label={`Blood Type: ${patient.bloodType}`}
              color="primary"
              variant="outlined"
            />
            <Chip
              label={`Age: ${patient.age}`}
              color="primary"
              variant="outlined"
            />
          </Box>
          
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Allergies:
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
            {patient.allergies.map((allergy, index) => (
              <Chip
                key={index}
                label={allergy}
                color="error"
                variant="outlined"
              />
            ))}
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Doctor's Notes:
          </Typography>
          {isDoctor && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
              {!isEditing ? (
                <IconButton onClick={() => setIsEditing(true)} color="primary">
                  <EditIcon />
                </IconButton>
              ) : (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton onClick={handleSaveNotes} color="primary">
                    <SaveIcon />
                  </IconButton>
                  <IconButton onClick={handleCancel} color="error">
                    <CancelIcon />
                  </IconButton>
                </Box>
              )}
            </Box>
          )}
          {isEditing ? (
            <TextField
              fullWidth
              multiline
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              variant="outlined"
            />
          ) : (
            <Paper variant="outlined" sx={{ p: 2, minHeight: '100px' }}>
              <Typography>
                {notes || 'No notes available.'}
              </Typography>
            </Paper>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PatientDetails; 