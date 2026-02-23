import React from 'react';
import { doctors } from '../assets/assets';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom"

const MyAppointment = () => {
  
  const {backendurl, token, getDoctorsData } = useContext(AppContext)

  const [appointments,setAppointments] = useState([])
  const months = ["","Jan","Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const navigate = useNavigate()
   const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0]+" "+months[Number(dateArray[1])]+ " "+ dateArray[2]
  }

const getUserAppointments = async () => {
  try{

        const { data } = await axios.get(
          `${backendurl}/api/users/my-appointments`, {headers: { token }}
        );

        if(data.success){
          setAppointments(data.appointments.reverse())
          console.log(data.appointments)
        }

  }catch(error){
    console.log(error)
    toast.error(error.message)
  }
}

const cancelAppointment = async (appointmentId) => {
  try{

     const { data } = await axios.post(`${backendurl}/api/users/cancel-appointment`,{appointmentId},{ headers: { token }});
   
       if (data.success) {
         toast.success(data.message);
         getUserAppointments();
         getDoctorsData()
       } else {
         toast.error(data.message);
       }

  }catch(error){
    console.log(error)
    toast.error(error.message)
  }
}
const initPay = (order) => {
  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: order.amount,
    currency: order.currency,
    name: 'Appointment Payment',
    description: 'Appointment Payment',
    order_id: order.id,
    receipt: order.receipt,
    handler: async (response) => {
      console.log(response);
      // Optionally, you can send `response.razorpay_payment_id` to your backend to verify payment


      try{
         const { data } = await axios.post(`${backendurl}/api/users/verifyRozarpay`,response,{ headers: { token }});
          if(data.success){
            getUserAppointments()
              navigate('/my-appointments');
          }
      }
      catch(error){
            console.log(error)
            toast.error(error.message)
      }
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};


const appointmentRazorpay = async (appointmentId)=>{
const { data } = await axios.post(`${backendurl}/api/users/payment-razorpay`,{appointmentId},{ headers: { token }});
   
    if (data.success){
      initPay(data.order);
      
    }
}

useEffect(()=>{
  if(token){
    getUserAppointments()
  }
},[token])

  return (
    <div className="px-4 md:px-8 lg:px-20 pt-10">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">My Appointments</h2>
      <div className="space-y-4">
        {appointments.map((doc, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row justify-between items-start md:items-center border border-gray-200 rounded-lg p-4"
          >
            <div className="flex gap-4 items-start">
              <img src={doc.docData.image} alt={doc.docData.name} className="w-24 h-24 object-cover rounded-md" />
              <div>
                <h3 className="font-semibold text-gray-800">{doc.docData.name}</h3>
                <p className="text-sm text-gray-500 mb-1">{doc.docData.speciality}</p>
              <p className="text-sm text-gray-600">
  <span className="font-semibold">Address:</span> {typeof doc.docData.address === "string" ? doc.docData.address :   `${doc.docData.address?.line1 || ''}, ${doc.docData.address?.line2 || ''}`}
</p>

                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-semibold">Date & Time:</span> {slotDateFormat(doc.slotDate)} | {doc.slotTime}
                </p>
              </div>
            </div>

            <div className="mt-4 md:mt-0 space-y-2 md:space-y-0 md:flex md:flex-col md:items-end gap-2">
              {/* {doc.cancelled && doc.payment && <button className='sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50'> Paid</button>} */}
              {!doc.cancelled && doc.payment && !doc.isCompleted &&
                 <button   className="w-[140px] h-[40px] text-stone-500 bg-indigo-50 text-sm font-medium rounded hover:brightness-110 transition-all duration-200">Paid</button>}

             {!doc.cancelled && !doc.payment && !doc.isCompleted &&
                 <button onClick={()=>appointmentRazorpay(doc._id)}  className="w-[140px] h-[40px] bg-[#6C63FF] text-white text-sm font-medium rounded hover:brightness-110 transition-all duration-200">Pay Online</button>}
             

             
            {!doc.cancelled && !doc.isCompleted && <button onClick={()=>cancelAppointment(doc._id)} className="w-[140px] h-[40px] border border-gray-400 text-gray-600 text-sm font-medium rounded hover:bg-gray-100 transition-all duration-200">
                Cancel Appointment
              </button>}
              {doc.cancelled && !doc.isCompleted &&<button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500 '>Appointement Cancelled</button>}
               {doc.isCompleted &&<button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500 '> Completed</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointment;

