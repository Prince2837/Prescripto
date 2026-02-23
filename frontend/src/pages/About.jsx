import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div className="px-6 md:px-10 lg:px-20 py-14 text-gray-800 max-w-screen-xl mx-auto">

      {/* Heading */}
   <h2 className="text-2xl font-semibold text-center mt-8 mb-20">
  ABOUT <span className="text-black font-bold">US</span>
</h2>


      {/* Image + Text Section */}
  <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-4 mb-20">


        {/* Left - Image */}
        <div className="flex justify-center md:justify-start">
          <img
            src={assets.about_image}
            alt="Doctors"
            className="rounded-lg w-[90%] md:w-[100%] max-w-[400px]"
          />
        </div>

        {/* Right - Text */}
        <div className="space-y-5 text-[15px] text-gray-600 leading-relaxed">
          <p>
            Welcome to <strong>Prescripto</strong>, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
          </p>

          <p>
            Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.
          </p>

          <div className="pt-3">
            <p className="font-semibold text-gray-800 mb-2 text-[15px]">Our Vision</p>
            <p>
              Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <h2 className="text-sm font-semibold text-gray-800 mb-6">
        WHY <span className="font-bold">CHOOSE US</span>
      </h2>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
  {/* Card 1 */}
  <div className="p-10 border border-gray-300 rounded-xl hover:bg-indigo-50 transition-all duration-300 cursor-pointer text-center">
    <h3 className="text-lg font-bold mb-3 text-gray-800 uppercase">Efficiency</h3>
    <p className="text-base text-gray-600">
      Streamlined appointment scheduling that fits into your busy lifestyle.
    </p>
  </div>

  {/* Card 2 */}
  <div className="p-10 border border-gray-300 rounded-xl hover:bg-indigo-50 transition-all duration-300 cursor-pointer text-center">
    <h3 className="text-lg font-bold mb-3 text-gray-800 uppercase">Convenience</h3>
    <p className="text-base text-gray-600">
      Access to a network of trusted healthcare professionals in your area.
    </p>
  </div>

  {/* Card 3 */}
  <div className="p-10 border border-gray-300 rounded-xl hover:bg-indigo-50 transition-all duration-300 cursor-pointer text-center">
    <h3 className="text-lg font-bold mb-3 text-gray-800 uppercase">Personalization</h3>
    <p className="text-base text-gray-600">
      Tailored recommendations and reminders to help you stay on top of your health.
    </p>
  </div>
</div>

      </div>

  );
};

export default About;

