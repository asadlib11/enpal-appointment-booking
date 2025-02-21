import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Button,
  Chip,
} from "@mui/material";
import { parseISO, differenceInMinutes } from "date-fns";

interface Slot {
  id: string;
  startDate: string;
  isBooked?: boolean;
  bookedCustomerName?: string;
}

interface TimeSlotListProps {
  slots: Slot[];
  onSlotSelect: (slot: Slot) => void;
  onCancelBooking?: (slotId: string) => void;
}

const TimeSlotList: React.FC<TimeSlotListProps> = ({
  slots,
  onSlotSelect,
  onCancelBooking,
}) => {
  const formatTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes.toString().padStart(2, "0");
    return `${displayHours}:${displayMinutes} ${ampm}`;
  };

  const getSlotDuration = (currentSlot: Slot, index: number) => {
    if (index === slots.length - 1) {
      return 30;
    }
    const currentStart = parseISO(currentSlot.startDate);
    const nextStart = parseISO(slots[index + 1].startDate);
    return differenceInMinutes(nextStart, currentStart);
  };

  return (
    <List>
      {slots.map((slot, index) => (
        <ListItem
          key={slot.id}
          disablePadding
          sx={{
            mb: 1,
            backgroundColor: "background.paper",
            borderRadius: 1,
            border: 1,
            borderColor: "divider",
          }}
        >
          <Box
            sx={{
              width: "100%",
              p: 2,
              borderRadius: 1,
            }}
          >
            <Box sx={{ 
              display: "flex", 
              justifyContent: "space-between",
              alignItems: "flex-start"
            }}>
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <Typography variant="h6" component="span">
                    {formatTime(slot.startDate)}
                  </Typography>
                  <Chip size="small" label="UTC" variant="outlined" />
                  <Chip
                    size="small"
                    label={`${getSlotDuration(slot, index)} min`}
                    variant="outlined"
                    color="primary"
                  />
                  {slot.isBooked && (
                    <Chip
                      size="small"
                      label="Booked"
                      color="error"
                      variant="filled"
                      sx={{ ml: 1 }}
                    />
                  )}
                </Box>
                {slot.isBooked && (
                  <Typography variant="body2" color="text.secondary">
                    Booked by: {slot.bookedCustomerName}
                  </Typography>
                )}
              </Box>
              <Box>
                {slot.isBooked ? (
                  onCancelBooking && (
                    <Button
                      size="small"
                      color="error"
                      variant="outlined"
                      onClick={() => onCancelBooking(slot.id)}
                    >
                      Cancel Booking
                    </Button>
                  )
                ) : (
                  <Button
                    size="small"
                    color="primary"
                    variant="contained"
                    onClick={() => onSlotSelect(slot)}
                  >
                    Book Appointment
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        </ListItem>
      ))}
      {slots.length === 0 && (
        <Typography
          variant="subtitle1"
          color="text.secondary"
          sx={{ textAlign: "center", py: 4 }}
        >
          No time slots available for this date.
        </Typography>
      )}
    </List>
  );
};

export default TimeSlotList;
