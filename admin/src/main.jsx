import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./AuthContext";
import { AdminProvider } from "./AdminContext";
import DoctorContextProvider from "./DoctorContext"; // ✅ fixed

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AdminProvider>
          <DoctorContextProvider> {/* ✅ now correct */}
            <App />
          </DoctorContextProvider>
        </AdminProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

