import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
  
<div className="mt-10 mx-6 md:mx-10 lg:mx-20">
  <div className="flex flex-col md:flex-row flex-wrap bg-[#6366f1] rounded-lg px-6 md:px-10 lg:px-20">

    {/* Left Content */}
    <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 m-auto md:py-[10vw]">
      <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight">
        Book Appointment <br /> With Trusted Doctors
      </h1>

      <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
        {/* Profile Images */}
        <img src={assets.group_profiles} alt="User 1" className="w-28" />

        {/* Description */}
        <p className="text-sm md:text-base max-w-md">
          Simply browse through our extensive list of trusted doctors, <br className="hidden sm:block" />
          schedule your appointment hassle-free.
        </p>
      </div>

      <button className="flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300">
        <span>Book appointment</span>
        <img className="w-3" src={assets.arrow_icon} alt="" />
      </button>
    </div>

    {/* Right Image */}
    <div className="md:w-1/2 relative">
      <img
        src={assets.header_img}
        alt="Doctors"
        className="w-full md:absolute bottom-0 h-auto rounded-lg"
      />
    </div>

  </div>
</div>



  )
}

export default Header
