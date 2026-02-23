import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="bg-white text-gray-800 py-16 px-6 md:px-20">
      <h2 className="text-center text-3xl font-semibold mb-12">
        CONTACT <span className="text-black font-bold">US</span>
      </h2>

      <div className="flex flex-col lg:flex-row items-start justify-center gap-12">
        {/* Left Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={assets.contact_image}
            alt="Doctor vaccinating child"
            className="w-full max-w-md rounded-md"
          />
        </div>

        {/* Right Content */}
        <div className="w-full lg:w-1/2 space-y-10">
          <div>
            <h3 className="text-lg font-semibold mb-2">OUR OFFICE</h3>
            <p>54709 Willms Station</p>
            <p>Suite 350, Washington, USA</p>
            <p className="mt-2">Tel: (415) 555-0132</p>
            <p>Email: greatstackdev@gmail.com</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">CAREERS AT PRESCRIPTO</h3>
            <p className="mb-4">
              Learn more about our teams and job openings.
            </p>
            <button className="border border-gray-500 text-gray-700 px-4 py-2 hover:bg-gray-100 transition">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
