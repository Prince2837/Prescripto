import { createContext, useState, useEffect } from "react";
import { doctors } from "../assets/assets";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

// Create context
export const AppContext = createContext();

// Provider component
const AppContextProvider = (props) => {
  const backendurl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userData, setUserData] = useState(false);

  // Save or remove token from localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // Load user profile if token is present
  useEffect(() => {
    if (token) {
      loadUserprofileData();
    } else {
      setUserData(false);
    }
  }, [token]);

  // Fetch user profile data
  const loadUserprofileData = async () => {
    try {
      const { data } = await axios.get(`${backendurl}/api/users/get-profile`, {
        headers: { token }
      });

      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Fetch doctors data (you can use this in other components)
  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(`${backendurl}/api/doctors`);
      return data;
    } catch (error) {
      console.error("Error fetching doctors:", error);
      toast.error("Failed to load doctors");
      return [];
    }
  };

  const value = {
    doctors,
    getDoctorsData,
    backendurl,
    token,
    setToken,
    userData,
    setUserData,
    loadUserprofileData
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
      <ToastContainer />
    </AppContext.Provider>
  );
};

export default AppContextProvider;
