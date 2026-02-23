import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../AdminContext';
import { assets } from '../assets/assets';

// 🧠 Calculate Age from DOB
const calculateAge = (dob) => {
  if (!dob) return "N/A";
  const birthDate = new Date(dob);
  if (isNaN(birthDate)) return "N/A";

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

// 🗓️ Format slot date and time
const formatSlotDateTime = (rawDateStr, rawTimeStr) => {
  try {
    const [day, month, year] = rawDateStr.split('_').map(Number);
    const date = new Date(year, month - 1, day); // JS months are 0-indexed
    const monthName = date.toLocaleString('default', { month: 'long' });
    return `${day} ${monthName} ${year}, ${rawTimeStr}`;
  } catch (err) {
    return "Invalid Format";
  }
};

const AllAppointments = () => {
  const { adminToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext);

  useEffect(() => {
    if (adminToken) getAllAppointments();
  }, [adminToken]);

  return (
    <div className='w-full max-w-6xl mx-auto p-5'>
      <p className='text-xl font-semibold mb-4'>All Appointments</p>

      <div className='bg-white shadow-sm rounded-lg overflow-hidden'>
        <div className='grid grid-cols-[0.5fr_2.5fr_1fr_1.5fr_2fr_1fr_1fr] bg-gray-100 text-gray-700 font-medium text-sm px-6 py-3'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Status</p>
        </div>

        {/* ✅ Safely check if appointments is an array */}
        {!Array.isArray(appointments) ? (
          <p className='text-center text-gray-500 py-10'>Loading appointments...</p>
        ) : appointments.length === 0 ? (
          <p className='text-center text-gray-500 py-10'>No appointments found.</p>
        ) : (
          appointments.map((app, index) => (
            <div
              key={app._id}
              className='grid grid-cols-[0.5fr_2.5fr_1fr_1.5fr_2fr_1fr_1fr] items-center text-sm border-t px-6 py-4'
            >
              <p>{index + 1}</p>

              {/* Patient Info */}
              <div className='flex items-center gap-2'>
                <img
                  src={app.userData?.image || 'https://via.placeholder.com/40'}
                  alt='Patient'
                  className='w-8 h-8 rounded-full object-cover'
                />
                <span>{app.userData?.name || 'N/A'}</span>
              </div>

              <p>{calculateAge(app.userData?.dob)}</p>
              <p>{formatSlotDateTime(app.slotDate, app.slotTime)}</p>

              {/* Doctor Info */}
              <div className='flex items-center gap-2'>
                <img
                  src={app.docData?.image || 'https://via.placeholder.com/40'}
                  alt='Doctor'
                  className='w-8 h-8 rounded-full object-cover'
                />
                <span>{app.docData?.name || 'N/A'}</span>
              </div>

              <p>₹{app.amount}</p>

              {/* Cancelled or Cancel Button */}
              {app.cancelled ? 
                <p className='text-red-500 text-xs font-medium'>Cancelled</p>
               : app.isCompleted
                ? <p className='text-green-500 text-xs font-medium'>completed</p>
                : <img onClick={() => cancelAppointment(app._id)} className='w-6 cursor-pointer' src={assets.cancel_icon}/>
              }
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllAppointments;
