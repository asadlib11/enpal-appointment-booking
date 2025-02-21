import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Alert,
  Card,
  CardContent,
  IconButton,
  Grid,
  Chip,
  Divider,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import DateRangeIcon from '@mui/icons-material/DateRange';
import api from '../services/api';

interface Slot {
  id: string;
  startDate: string;
  isBooked?: boolean;
  bookedCustomerName?: string;
}

const SalesManager = () => {
  const [bookedSlots, setBookedSlots] = useState<Slot[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [confirmDialog, setConfirmDialog] = useState<{ open: boolean; slotId: string | null }>({
    open: false,
    slotId: null
  });

  useEffect(() => {
    fetchBookedSlots();
  }, []);

  const fetchBookedSlots = async () => {
    try {
      setLoading(true);
      const response = await api.get('/slots', {
        params: {
          booked: true
        }
      });

      if (response.data.success) {
        const sortedSlots = response.data.data
          .filter((slot: Slot) => slot.isBooked)
          .sort((a: Slot, b: Slot) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
        setBookedSlots(sortedSlots);
        setError('');
      } else {
        setError('Failed to fetch booked slots');
      }
    } catch (err) {
      console.error('Error fetching booked slots:', err);
      setError('Failed to fetch booked slots. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (slotId: string) => {
    try {
      const response = await api.post(`/slots/${slotId}/cancel-booking`);

      if (response.data.success) {
        setBookedSlots(bookedSlots.filter(slot => slot.id !== slotId));
        setError('');
      } else {
        setError('Failed to cancel booking');
      }
    } catch (err) {
      console.error('Error canceling booking:', err);
      setError('Failed to cancel booking. Please try again later.');
    } finally {
      setConfirmDialog({ open: false, slotId: null });
    }
  };

  const handleCancelClick = (slotId: string) => {
    setConfirmDialog({ open: true, slotId });
  };

  const formatTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes.toString().padStart(2, '0');
    return `${displayHours}:${displayMinutes} ${ampm}`;
  };

  const formatDate = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${days[date.getUTCDay()]}, ${months[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
          <DateRangeIcon color="primary" sx={{ fontSize: 40 }} />
          <Typography variant="h4" component="h1">
            Booked Appointments
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {bookedSlots.map((slot) => (
              <Grid item xs={12} key={slot.id}>
                <Card sx={{ 
                  position: 'relative',
                  '&:hover': {
                    boxShadow: 6
                  }
                }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                          <AccessTimeIcon color="primary" />
                          <Typography variant="h6">
                            {formatTime(slot.startDate)}
                          </Typography>
                          <Chip
                            size="small"
                            label="UTC"
                            variant="outlined"
                          />
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                          <DateRangeIcon color="primary" />
                          <Typography variant="body1">
                            {formatDate(slot.startDate)}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <PersonIcon color="primary" />
                          <Typography variant="body1">
                            {slot.bookedCustomerName}
                          </Typography>
                        </Box>
                      </Box>

                      <IconButton
                        onClick={() => handleCancelClick(slot.id)}
                        color="error"
                        aria-label="Cancel booking"
                        sx={{ 
                          opacity: 0.7,
                          transition: 'all 0.2s ease-in-out',
                          '&:hover': {
                            opacity: 1,
                            transform: 'scale(1.1)',
                            backgroundColor: 'transparent'
                          }
                        }}
                      >
                        <CancelIcon />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}

            {bookedSlots.length === 0 && (
              <Grid item xs={12}>
                <Box sx={{ 
                  p: 4, 
                  textAlign: 'center',
                  backgroundColor: 'grey.50',
                  borderRadius: 1
                }}>
                  <Typography variant="subtitle1" color="text.secondary">
                    No booked appointments
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        )}
      </Paper>

      <Dialog
        open={confirmDialog.open}
        onClose={() => setConfirmDialog({ open: false, slotId: null })}
        PaperProps={{
          elevation: 4,
          sx: {
            width: '100%',
            maxWidth: '400px',
            p: 1
          }
        }}
      >
        <DialogTitle>Cancel Appointment</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to cancel this appointment?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button 
            onClick={() => setConfirmDialog({ open: false, slotId: null })}
            variant="outlined"
            color="inherit"
          >
            No, Keep it
          </Button>
          <Button
            onClick={() => confirmDialog.slotId && handleCancel(confirmDialog.slotId)}
            variant="contained"
            color="error"
          >
            Yes, Cancel Appointment
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SalesManager;
