import { createTheme } from "@mui/material";
import { orange, green, red, blue, grey } from "@mui/material/colors";

const globalTheme = createTheme({
  palette: {
    primary: {
      main: blue[600],
      light: blue[300],
      dark: blue[700],
    },
    secondary: {
      main: grey[100],
    },
    success: {
      main: green[500],
    },
    error: {
      main: red[500],
    },
    info: {
      main: blue[500],
    },
    warning: {
      main: orange[700],
    },
    text: {
      primary: grey[900],
      secondary: grey[700],
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          // Chỉ áp dụng khi button có color="secondary"
          "&.MuiButton-containedSecondary:hover": {
            backgroundColor: grey[200],
          },
        },
      },
    },
  },
});

export default globalTheme;
