import React from 'react';

interface DatePickerProps {
  selectedDate: Date;
  onChange: (date: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, onChange }) => {
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    onChange(newDate);
  };

  return (
    <div className="date-picker">
      <label htmlFor="date">Select Date:</label>
      <input
        type="date"
        id="date"
        value={selectedDate.toISOString().split('T')[0]}
        onChange={handleDateChange}
        min={new Date().toISOString().split('T')[0]}
      />
    </div>
  );
};

export default DatePicker;
