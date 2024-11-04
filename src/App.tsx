import Loading from "./components/commons/Loading";
import { SnackbarProvider } from "./components/commons/SnackbarContent";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <div>
      <SnackbarProvider>
        <Loading />
        <AppRouter />
      </SnackbarProvider>
    </div>
  );
}

export default App;
