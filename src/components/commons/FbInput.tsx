import React, { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";

interface SearchComponentProps {
  placeholder?: string;
  disabled?: boolean;
  onHandleText: (value: string) => void;
}

const FbInput: React.FC<SearchComponentProps> = ({
  placeholder,
  disabled = false,
  onHandleText: onText,
}) => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onText) {
      onText(searchValue);
    }
  };

  return (
    <TextField
      variant="outlined"
      placeholder={placeholder}
      value={searchValue}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
      disabled={disabled}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "20px",
          backgroundColor: disabled ? "#f0f0f0" : "#F4F5F7",
          "& fieldset": {
            border: "none",
          },
          "&:hover fieldset": {
            border: "none",
          },
          "&.Mui-focused fieldset": {
            border: "none",
          },
        },
        "& .MuiInputBase-input": {
          padding: "0.5rem 1rem",
        },
        width: "100%"
      }}
    />
  );
};

export default FbInput;
