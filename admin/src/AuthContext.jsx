import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [aToken, setATokenState] = useState("");

  // ✅ Set token to state + localStorage
  const setAToken = (token) => {
    setATokenState(token);
    if (token) {
      localStorage.setItem("adminToken", token);
    } else {
      localStorage.removeItem("adminToken");
    }
  };

  // ✅ On page reload: check if token exists in localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("adminToken");
    if (savedToken) {
      setATokenState(savedToken);
      setIsAuthenticated(true);
    }
  }, []);

  // ✅ Just update isAuthenticated
  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAToken(""); // clear token from both state and localStorage
  };

  return (
    <AuthContext.Provider
      value={{ aToken, setAToken, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}