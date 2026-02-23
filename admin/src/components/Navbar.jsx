import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../AdminContext';
import { DoctorContext } from '../DoctorContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { adminToken } = useContext(AdminContext);
  const { dToken ,setDToken} = useContext(DoctorContext);

  return (
    <>
      {adminToken ? (
        <nav className="fixed top-0 left-0 w-full h-16 bg-white shadow flex items-center justify-between px-6 z-50">
          <div className="flex items-center space-x-3">
            <img src={assets.admin_logo} alt="Logo" className="h-10" />
            <span className="text-sm bg-gray-200 px-2 py-1 rounded">Admin</span>
          </div>
          <button
            onClick={() => navigate('/')}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-full text-sm transition-all"
          >
            Logout
          </button>
        </nav>
      ) : dToken ? (
        <nav className="fixed top-0 left-0 w-full h-16 bg-white shadow flex items-center justify-between px-6 z-50">
          <div className="flex items-center space-x-3">
            <img src={assets.admin_logo} alt="Logo" className="h-10" />
            <span className="text-sm bg-gray-200 px-2 py-1 rounded">Doctor</span>
          </div>
          <button
            onClick={() => navigate('/')}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-full text-sm transition-all"
          >
            Logout
          </button>
        </nav>
      ) : null}
    </>
  );
};

export default Navbar;
