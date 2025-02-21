import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Alert,
  Paper,
  Box
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TimeSlotList from '../components/TimeSlotList';
import BookingModal from '../components/BookingModal';
import api from '../services/api';

interface Slot {
  id: string;
  startDate: string;
  isBooked?: boolean;
  bookedCustomerName?: string;
}

const CustomerBooking = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchSlots();
  }, [selectedDate]);

  const fetchSlots = async () => {
    try {
      const response = await api.get('/slots', {
        params: {
          date: selectedDate.toISOString().split('T')[0]
        }
      });
      
      if (response.data.success) {
        setSlots(response.data.data);
        setError('');
      } else {
        setError('Failed to fetch slots');
      }
    } catch (err) {
      console.error('Error fetching slots:', err);
      setError('Failed to fetch slots. Please try again later.');
    }
  };

  const handleSlotSelect = (slot: Slot) => {
    setSelectedSlot(slot);
    setShowModal(true);
  };

  const handleBooking = async (name: string) => {
    if (!selectedSlot) return;

    try {
      const response = await api.post(`/slots/${selectedSlot.id}/book`, {
        name
      });

      if (response.data.success) {
        setShowModal(false);
        fetchSlots();
        setError('');
      } else {
        setError('Failed to book slot');
      }
    } catch (err) {
      console.error('Error booking slot:', err);
      setError('Failed to book slot. Please try again later.');
    }
  };

  const handleCancel = async (slotId: string) => {
    try {
      const response = await api.post(`/slots/${slotId}/cancel-booking`);

      if (response.data.success) {
        setSlots(slots.map(slot => 
          slot.id === response.data.data.id ? response.data.data : slot
        ));
        setError('');
      } else {
        setError('Failed to cancel booking');
      }
    } catch (err) {
      console.error('Error canceling booking:', err);
      setError('Failed to cancel booking. Please try again later.');
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Book an Appointment
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box sx={{ mb: 4 }}>
            <DatePicker
              label="Select Date"
              value={selectedDate}
              onChange={(newDate) => newDate && setSelectedDate(newDate)}
              slotProps={{ 
                textField: { 
                  fullWidth: true,
                  helperText: "Select any date to view available slots"
                } 
              }}
              views={['year', 'month', 'day']}
            />
          </Box>

          <TimeSlotList 
            slots={slots} 
            onSlotSelect={handleSlotSelect}
            onCancelBooking={handleCancel}
          />
        </Paper>

        {showModal && selectedSlot && (
          <BookingModal
            slot={selectedSlot}
            onConfirm={handleBooking}
            onClose={() => setShowModal(false)}
            allSlots={slots}
          />
        )}
      </Container>
    </LocalizationProvider>
  );
};

export default CustomerBooking;
