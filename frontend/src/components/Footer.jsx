 import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className="mt-16 px-6 md:px-16 lg:px-32">
      <div className="bg-white py-12 border-t">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          
          {/* Left Section */}
          <div className="flex flex-col gap-4">
            <img src={assets.logo} alt="Prescripto" className="w-40" />
            <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...
            </p>
          </div>

          {/* Center Section */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">COMPANY</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About us</a></li>
              <li><a href="/contact">Contact us</a></li>
              <li><a href="#">Privacy policy</a></li>
            </ul>
          </div>

          {/* Right Section */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">GET IN TOUCH</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>+1-212-456-7890</li>
              <li>greatstackdev@gmail.com</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t mt-12 pt-4 text-center text-sm text-gray-500">
          Copyright © 2024 GreatStack - All Right Reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
