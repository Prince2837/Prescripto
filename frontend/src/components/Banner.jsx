import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {

    const navigator = useNavigate() 
  return (
  <div className="mt-10 mx-6 md:mx-10 lg:mx-20">
  <div className="flex flex-col md:flex-row items-center justify-between bg-[#6366f1] rounded-xl px-6 md:px-10 lg:px-20 py-10">
    
    {/* Left Side Text */}
    <div className="text-white text-center md:text-left space-y-6 md:space-y-4">
      <h2 className="text-3xl md:text-4xl font-bold">
        Book Appointment <br />
        With 100+ Trusted Doctors
      </h2>

      <button  onClick={()=>{{navigator('/login'); scrollTo(0,0) }}} className="bg-white text-gray-800 px-6 py-3 rounded-full text-sm hover:scale-105 transition duration-300">
        Create account
      </button>
    </div>

    {/* Right Side Image */}
    <div className="mt-8 md:mt-0 md:ml-10">
      <img src={assets.appointment_img} alt="Doctor" className="w-[280px] md:w-[300px] lg:w-[340px]" />
    </div>
    
  </div>
</div>

  )
}

export default Banner
