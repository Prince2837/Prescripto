import React from 'react'
import { useEffect,useContext } from 'react';
import { assets } from '../assets/assets';
import { AdminContext } from '../AdminContext';

const DashboardContent = () => {
 const { adminToken, getDashData, dashData ,cancelAppointment} = useContext(AdminContext);
//  🗓️ Format slot date and time
const formatSlotDateTime = (rawDateStr,rawTimeStr) => {
  try {
    const [day, month, year] = rawDateStr.split('_').map(Number);
    const date = new Date(year, month - 1, day); // JS months are 0-indexed
    const monthName = date.toLocaleString('default', { month: 'long' });
    return `${day} ${monthName} ${year},${rawTimeStr}`;
  } catch (err) {
    return "Invalid Format";
  }
};


useEffect(() => {
  if (adminToken) {
    getDashData();
  }
}, [adminToken]);

return dashData && (
  <div className='m-8'>
    <div className='flex flex-wrap gap-5'>
      <div className='flex items-center gap-3 bg-white p-4 min-w-62 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
        <img className='w-14' src={assets.doctor_icon} alt="" />
        <div>
          <p className='text-xl font-semibold text-gray-600'>{dashData.doctors}</p>
          <p className='text-gray-400'>Doctors</p>
        </div>
      </div>

       <div className='flex items-center gap-3 bg-white p-4 min-w-62 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
        <img className='w-14' src={assets.appointments_icon} alt="" />
        <div>
          <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
          <p className='text-gray-400'>Appointments</p>
        </div>
      </div>

       <div  className='flex items-center gap-3 bg-white p-4 min-w-62 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
        <img className='w-14' src={assets.patients_icon} alt="" />
        <div>
          <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
          <p className='text-gray-400'>patients</p>
        </div>
      </div>
    </div>
    <div className='bg-white w-196  '>

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
      {/* <p className='text-gray-600'>{item.slotDate}</p> */}
      <p className='text-gray-600'>{formatSlotDateTime(item.slotDate, item.slotTime)}</p>
    </div>
           {item.cancelled ? 
                           <p className='text-red-500 text-xs font-medium'>Cancelled</p>
                          : item.isCompleted
                           ? <p className='text-green-500 text-xs font-medium'>completed</p>
                           : <img onClick={() => cancelAppointment(item._id)} className='w-6 cursor-pointer' src={assets.cancel_icon}/>
                         }
        </div>
      ))
    }
  </div>

</div>

  </div>
);

}

export default DashboardContent
