import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./Login";
import Doctors from "./Doctors";
import ProtectedRoute from "./ProtectedRoute";
import AddDoctorForm from "./AddDoctorForm";
import Navbar from "./components/Navbar";
import Slider from "./components/Slider";
import DashboardContent from "./components/DashboardContent";
import AllAppointments from "./components/AllAppointments";
// import  DoctorContextProvider  from "./DoctorContext";
import  {useContext}  from "react";
// import { AdminContext } from "./AdminContext";
import DoctorContextProvider from './DoctorContext';
// import DoctorContextProvider from "./context/DoctorContext"; // <-- import context provider

// import  useContext  from "react";
import { AdminContext } from "./AdminContext";
import { DoctorContext } from "./DoctorContext";
import DoctorDashboard from "./Doctor/DoctorDashboard";
import Doctorappointment from "./Doctor/Doctorappointment";
import DoctorProfile from "./Doctor/DoctorProfile";

export default function App() {
  const {adminToken} = useContext(AdminContext)
const {dToken} = useContext(DoctorContext)

  const location = useLocation();

  const isAuthPage = location.pathname === '/' || location.pathname === '/login';

  return adminToken || dToken ? (
    <DoctorContextProvider> {/* ✅ wrap the app */}
      <div className="flex h-screen overflow-hidden">
        {!isAuthPage && <Navbar />}
        {!isAuthPage && <Slider />}

        <main className={`${!isAuthPage ? 'pt-16 pl-60' : ''} w-full h-full overflow-y-auto bg-gray-50`}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/admin-dashboard" element={
              <ProtectedRoute>
                <DashboardContent />
              </ProtectedRoute>
            } />
            <Route path="/api/doctors/add" element={<AddDoctorForm />} />
            <Route path="/api/doctors" element={<Doctors />} />
            <Route path="/appointments" element={<AllAppointments />} />

            {/* Doctor Route */}
             <Route path = "/doctor-dashboard" element={<DoctorDashboard/>}/>
             <Route path = "/doctor-appointments" element={<Doctorappointment/>}/>
             <Route path = "/doctor-profile" element={<DoctorProfile/>}/>
            

          </Routes>
        </main>
      </div>
    </DoctorContextProvider>
  ):(
    <>
    <Login/>

    </>
  )
}
