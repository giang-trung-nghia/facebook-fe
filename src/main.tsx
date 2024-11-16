import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { persistor, store } from "./store/index.ts";
import { PersistGate } from "redux-persist/integration/react";
import 'react-toastify/dist/ReactToastify.css';
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
