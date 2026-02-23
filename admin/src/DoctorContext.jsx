import axios from 'axios';
import { createContext, useState } from 'react';
import { toast } from 'react-toastify';

export const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [dToken, setDToken] = useState(localStorage.getItem("dToken") || "");
  const [appointments, setAppointments] = useState([])
  const [dashData,setDashData] = useState(false)
  const [profileData,setProfileData] = useState(false)
const getAppointments = async(req,res)=>{
    try{
const { data } = await axios.get(
  backendUrl + '/api/doctor/appointments',
  {
    headers: {
      Authorization: `Bearer ${dToken}` // ✅ CORRECT header format
    }
  }
);

    if(data.success){
      setAppointments(data.appointments)
      console.log(data.appointments)
    }else{
      toast.error(data.message)
    }
    }catch(error){
      console.log(error);
      toast.error(error.message)
    }
  }
// const getAppointments = async () => {
//     try {
//       const { data } = await axios.post(
//         `${backendUrl}/api/doctor/appointments`,
//         {},
//         {
//           headers: {
//             dtoken: dToken, // ✅ fixed casing
//           },
//         }
//       );

//       if (data.success) {
//         setAppointments(data.appointments.reverse());
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error('Error fetching appointments:', error);
//       toast.error(error.message);
//     }
//   };
//   const completeAppointment = async (appointmentId, docId) => {
//   try {
//     const { data } = await axios.post(
//       backendUrl + '/api/doctor/complete-appointment',
//       { appointmentId, docId },
//       { headers: { dToken } }
//     );

//     if (data.success) {
//       toast.success(data.message);
//       getAppointments();
//       getDashData(); // ✅ Refresh dashboard stats
//     } else {
//       toast.error(data.message);
//     }
//   } catch (error) {
//     console.log(error);
//     toast.error(error.message);
//   }
// };

const completeAppointment = async (appointmentId) => {
  try {
    const { data } = await axios.post(
  `${backendUrl}/api/doctor/complete-appointment`,
  { appointmentId }, // body
  {
    headers: {
      Authorization: `Bearer ${dToken}`
    }
  }
);

    if (data.success) {
      toast.success(data.message);
      getAppointments();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || error.message);
  }
};

const cancelAppointment = async (appointmentId, onSuccessRefresh) => {
  try {
    const { data } = await axios.post(
      `${backendUrl}/api/doctor/cancel-appointment`,
      { appointmentId },
      {
        headers: {
          Authorization: `Bearer ${dToken}`
        }
      }
    );

    if (data.success) {
      toast.success(data.message);
      if (onSuccessRefresh) onSuccessRefresh();  // ✅ Refresh dashboard after cancel
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || error.message);
  }
};



// const getDashData = async () => {
//   try {
//     const res = await axios.get(`${backendUrl}/api/doctor/dashboard`, {
//   headers: {
//     Authorization: `Bearer ${dToken}`  
//   }
// });


//     console.log("Dashboard data fetched:", res.data);
//     setDashData(res.data.dashboard);
//   } catch (err) {
//     console.error("Dashboard fetch error:", err?.response?.data || err.message);
//   }
// };
const getDashData = async () => {
  try {
    const res = await axios.get(`${backendUrl}/api/doctor/dashboard`, {
  headers: {
    Authorization: `Bearer ${dToken}`  
  }
});


    console.log("Dashboard data fetched:", res.data);
    setDashData(res.data.dashboard);
  } catch (err) {
    console.error("Dashboard fetch error:", err?.response?.data || err.message);
  }
};

const getProfileData = async() =>{
  try {
     const { data } = await axios.get(
  backendUrl + '/api/doctor/profile',
  {
    headers: {
      Authorization: `Bearer ${dToken}`
    }
  }
);
if(data.success){
  setProfileData(data.profileData)
  console.log(data.profileData)
}

    
  } catch (err) {
    console.error("Profile fetch error:", err?.response?.data || err.message);
  }
}


  const value = {
    dToken,
    setDToken,
    backendUrl,
    appointments,
    setAppointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
    dashData,
    setDashData,
    getDashData,
    profileData,
    setProfileData,
    getProfileData
  };

  return (
    <DoctorContext.Provider value={value}>
      {children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
