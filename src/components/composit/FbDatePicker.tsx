import * as React from "react";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Box } from "@mui/material";

interface FbDatetimePickerProps {
  label: string;
  value: Date | null | undefined;
  onChange: (date: Date | null) => void;
  format?: string;
  time?: boolean; // Optional prop to show time picker
  disabled?: boolean;
}

const FbDatetimePicker: React.FC<FbDatetimePickerProps> = ({
  label,
  value,
  onChange,
  format = "MM/dd/yyyy",
  time = false, // Default to false if time is not provided
  disabled = false,
}) => {
  const handleDateChange = (date: Date | null) => {
    onChange(date);
  };

  const handleTimeChange = (date: Date | null) => {
    if (date) {
      // Ensure the time portion of the value is updated without modifying the date
      const updatedDate = new Date();
      updatedDate.setHours(date.getHours(), date.getMinutes());
      onChange(updatedDate);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        <DatePicker
          label={label}
          value={value}
          onChange={handleDateChange}
          format={format} // Format to use in the input field
          disabled={disabled}
        />
        {time && (
          <TimePicker
            sx={{ ml: "1rem" }}
            label="Select Time"
            value={value}
            onChange={handleTimeChange}
            disabled={disabled}
          />
        )}
      </Box>
    </LocalizationProvider>
  );
};

export default FbDatetimePicker;
