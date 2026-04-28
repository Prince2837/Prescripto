import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";


  const [adminToken, setAdminToken] = useState(localStorage.getItem("adminToken") || "");
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);

  // ✅ Restore token on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("adminToken");
    setAdminToken(storedToken || "");
  }, []);

  // ✅ Admin login
  const loginAdmin = async (email, password) => {
    try {
      const res = await axios.post(`${backendUrl}/api/admin/login`, {
        email,
        password,
      });

      const token = res.data.token;
      setAdminToken(token);
      localStorage.setItem("adminToken", token);
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";
      console.error("❌ Admin login failed:", message);
      toast.error(message);
      return { success: false, message };
    }
  };

  // ✅ Get all appointments
  const getAllAppointments = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/admin/appointments`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });

      console.log("✅ Full appointments response:", res.data);

      // Adjust this line based on actual backend response structure
      const appointmentList = res.data.appointments || res.data.data?.appointments || [];

      setAppointments(appointmentList);
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      console.error("❌ Failed to fetch appointments:", message);
      toast.error(`Failed to fetch appointments: ${message}`);
    }
  };

  // ✅ Calculate age from DOB
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // ✅ Cancel appointment
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/cancel-appointment`,
        { appointmentId },
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getAllAppointments();
        getDashData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ✅ Get dashboard data
  const getDashData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/dashboard`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });

      if (data.success) {
        setDashData(data.dashData);
        console.log("📊 Dashboard data:", data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        adminToken,
        setAdminToken,
        loginAdmin,
        appointments,
        getAllAppointments,
        cancelAppointment,
        calculateAge,
        backendUrl,
        dashData,
        getDashData,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
