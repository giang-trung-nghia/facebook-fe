import React, { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchComponentProps {
  placeholder?: string;
  disabled?: boolean;
  onSearch: (value: string) => void;
}

const FbSearchBox: React.FC<SearchComponentProps> = ({
  placeholder = "Search",
  disabled = false,
  onSearch,
}) => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(searchValue);
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
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: "action.disabled" }} />
          </InputAdornment>
        ),
      }}
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
          padding: "0.5rem",
        },
        // width: "100%",
        // maxWidth: "350px",
      }}
    />
  );
};

export default FbSearchBox;
