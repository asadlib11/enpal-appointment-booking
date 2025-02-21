import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  Typography,
  Box,
  Chip
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { addMinutes } from 'date-fns';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface Slot {
  id: string;
  startDate: string;
  isBooked?: boolean;
  bookedCustomerName?: string;
  duration?: number;
}

interface BookingModalProps {
  slot: Slot;
  onConfirm: (name: string) => void;
  onClose: () => void;
  allSlots?: Slot[];
}

const BookingModal: React.FC<BookingModalProps> = ({ slot, onConfirm, onClose, allSlots = [] }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    onConfirm(name);
  };

  // Helper function to format time in 12-hour format
  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes.toString().padStart(2, '0');
    return `${displayHours}:${displayMinutes} ${ampm}`;
  };

  // Helper function to format date
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    return `${days[date.getUTCDay()]}, ${months[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
  };

  const getSlotDuration = (currentSlot: Slot) => {
    const currentIndex = allSlots.findIndex(s => s.id === currentSlot.id);
    if (currentIndex === -1 || currentIndex === allSlots.length - 1) {
      // Default to 30 minutes if slot not found or is last slot
      return 30;
    }
    const currentStart = new Date(currentSlot.startDate);
    const nextStart = new Date(allSlots[currentIndex + 1].startDate);
    return Math.round((nextStart.getTime() - currentStart.getTime()) / (1000 * 60));
  };

  const duration = getSlotDuration(slot);

  const startDate = new Date(slot.startDate);
  const endDate = addMinutes(startDate, duration);
  const endDateISO = endDate.toISOString();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog 
        open={true} 
        onClose={onClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h5" component="div" gutterBottom>
            Book an Appointment
          </Typography>
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Stack spacing={3}>
              <TextField
                label="Your Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={!!error}
                helperText={error}
                autoFocus
                required
              />
              
              <Box>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  Date
                </Typography>
                <Typography variant="body1">
                  {formatDate(slot.startDate)}
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle1" color="primary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  Time
                  <Chip
                    icon={<AccessTimeIcon />}
                    label="UTC"
                    size="small"
                    variant="outlined"
                  />
                </Typography>
                <Typography variant="body1">
                  {formatTime(slot.startDate)} - {formatTime(endDateISO)}
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  Duration
                </Typography>
                <Typography variant="body1">
                  {duration} minutes
                </Typography>
              </Box>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={onClose} color="inherit">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              Confirm Booking
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </LocalizationProvider>
  );
};

export default BookingModal;
