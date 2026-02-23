import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, aToken } = useAuth();

  const tokenInStorage = localStorage.getItem("adminToken");

  if (!isAuthenticated && !aToken && !tokenInStorage) {
    return <Navigate to="/" replace />;
  }

  return children;
}