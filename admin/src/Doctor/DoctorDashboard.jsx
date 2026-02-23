import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../DoctorContext';
import { assets } from '../assets/assets'; 

const DoctorDashboard = () => {
  const {
    dToken,
    dashData,
    getDashData,
    cancelAppointment
  } = useContext(DoctorContext);

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

  useEffect(() => {
  if (dToken) {
    getDashData();
  }
}, [dToken]);


  return dashData && (
    <div className="m-8">
      {/* Summary Boxes */}
<div className="flex flex-wrap gap-5">
  {/* Earnings */}
  <div className="flex items-center gap-3 bg-white p-4 min-w-62 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
    <img className="w-14" src={assets.earning_icon} alt="Earnings Icon" />
    <div>
      <p className="text-xl font-semibold text-gray-600">&#8377;{dashData.earnings}</p>
      <p className="text-gray-400">Earnings</p>
    </div>
  </div>

  {/* Appointments */}
  <div className="flex items-center gap-3 bg-white p-4 min-w-62 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
    <img className="w-14" src={assets.appointments_icon} alt="Appointments Icon" />
    <div>
      <p className="text-xl font-semibold text-gray-600">{dashData.appointments}</p>
      <p className="text-gray-400">Appointments</p>
    </div>
  </div>

  {/* Patients */}
  <div className="flex items-center gap-3 bg-white p-4 min-w-62 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
    <img className="w-14" src={assets.patients_icon} alt="Patients Icon" />
    <div>
      <p className="text-xl font-semibold text-gray-600">{dashData.patients}</p>
      <p className="text-gray-400">Patients</p>
    </div>
  </div>
</div>


  <div className='flex items-center gap-2.5 px-4  py-4 mt-10 rounded-t border'>
    <img src={assets.list_icon} alt="" />
    <p className='font-semibold'>Latest Bookings</p>
  </div>

  <div className='pt-4 border border-t-0'>
    {
      dashData.latestAppointments.map((item, index) => (
  <div
    className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100'
    key={index}
  >
    <img
      className='rounded-full w-10'
      src={item.docData.image}
      alt=""
    />
    <div className='flex-1 text-sm'>
      <p className='text-gray-800 font-medium'>{item.docData.name}</p>
    <p className='text-gray-600'>{formatSlotDateTime(item.slotDate, item.slotTime)}</p>
    </div>
           {item.cancelled ? (
  <p className='text-red-500 text-xs font-medium'>Cancelled</p>
) : item.isCompleted ? (
  <p className='text-green-500 text-xs font-medium'>Completed</p>
) : (
  <img
    onClick={() => cancelAppointment(item._id, getDashData)}
    className='w-10 cursor-pointer'
    src={assets.cancel_icon}
    alt='Cancel'
    title='Cancel Appointment'
  />
)}

        </div>
      ))
    }
  </div>

    </div>
  );
};

export default DoctorDashboard;