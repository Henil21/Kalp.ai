import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import "./index.css";

import { AuthProvider } from "./auth/AuthContext";
import { LoaderProvider } from "./context/LoaderContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoaderProvider>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </LoaderProvider>
  </StrictMode>
);
