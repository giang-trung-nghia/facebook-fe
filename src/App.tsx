import { ThemeProvider } from "@mui/material";
import Loading from "./components/commons/Loading";
import AppRouter from "./routes/AppRouter";
import globalTheme from "./theme/globalTheme";

function App() {
  return (
    <ThemeProvider theme={globalTheme}>
      <Loading />
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
