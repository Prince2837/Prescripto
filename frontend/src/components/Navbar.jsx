import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);

  const [openUserMenu, setOpenUserMenu] = useState(false);

  const logout = () => {
    setToken('');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="flex items-center justify-between px-10 py-3 border-b shadow-sm bg-white">
      {/* Left: Logo */}
      <div className="flex items-center space-x-4">
        <img src={assets.logo} alt="Logo" className="h-10 w-auto" />
      </div>

      {/* Center: Navigation Links */}
      <div className="flex space-x-6 text-sm font-medium text-gray-800">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `relative after:content-[''] after:absolute after:h-[2px] after:w-full after:bg-indigo-600 after:left-0 after:-bottom-1 after:origin-left after:transition-transform hover:text-indigo-700 hover:after:scale-x-100 ${
              isActive ? 'text-indigo-700 after:scale-x-100' : 'text-gray-800 after:scale-x-0'
            }`
          }
        >
          HOME
        </NavLink>

        <NavLink
          to="/doctors"
          className={({ isActive }) =>
            `relative after:content-[''] after:absolute after:h-[2px] after:w-full after:bg-indigo-600 after:left-0 after:-bottom-1 after:origin-left after:transition-transform hover:text-indigo-700 hover:after:scale-x-100 ${
              isActive ? 'text-indigo-700 after:scale-x-100' : 'text-gray-800 after:scale-x-0'
            }`
          }
        >
          ALL DOCTORS
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            `relative after:content-[''] after:absolute after:h-[2px] after:w-full after:bg-indigo-600 after:left-0 after:-bottom-1 after:origin-left after:transition-transform hover:text-indigo-700 hover:after:scale-x-100 ${
              isActive ? 'text-indigo-700 after:scale-x-100' : 'text-gray-800 after:scale-x-0'
            }`
          }
        >
          ABOUT
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `relative after:content-[''] after:absolute after:h-[2px] after:w-full after:bg-indigo-600 after:left-0 after:-bottom-1 after:origin-left after:transition-transform hover:text-indigo-700 hover:after:scale-x-100 ${
              isActive ? 'text-indigo-700 after:scale-x-100' : 'text-gray-800 after:scale-x-0'
            }`
          }
        >
          CONTACT
        </NavLink>
      </div>

      {/* Right: Profile/Login + Admin/Doctor */}
      <div className="flex items-center space-x-4">
        {token && userData ? (
          <div className="relative inline-block text-left">
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => setOpenUserMenu(!openUserMenu)}
            >
              <img src={userData.image} alt="Profile" className="w-10 h-10 rounded-full" />
              <img src={assets.dropdown_icon} alt="Dropdown" className="w-4 h-4" />
            </div>

            {openUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <button
                  onClick={() => navigate('/my-profile')}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  My Profile
                </button>
                <button
                  onClick={() => navigate('/my-appointments')}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  My Appointments
                </button>
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-full text-sm"
          >
            Create account
          </button>
        )}

        {/* Admin/Doctor Portal Button */}
        <button
          onClick={() => (window.location.href = 'http://localhost:5174/')}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-full text-sm"
        >
          Admin/Doctor
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

// import React, { useContext, useState } from 'react';
// import { assets } from '../assets/assets';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { AppContext } from '../context/AppContext';

// const Navbar = () => {
//   const navigate = useNavigate();
//   const { token, setToken,userData } = useContext(AppContext); // correct variable
//   const [open, setOpen] = useState(false);

//   const logout = () => {
//     setToken(""); //  fixed from settoken to setToken
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (
//     <div>

//  <nav className="flex items-center justify-between px-10 py-3 border-b shadow-sm">

//       <div className="flex items-center space-x-2 px-10">
//         <img src={assets.logo} alt="Logo" className="" />
//       </div>


//       <div className="flex space-x-6 text-sm font-medium text-gray-800">
//        <NavLink
//   to="/"
//   className={({ isActive }) =>
//     `relative after:content-[''] after:absolute after:h-[2px] after:w-full after:bg-indigo-600 after:left-0 after:-bottom-1 after:origin-left after:transition-transform hover:text-indigo-700 hover:after:scale-x-100 ${
//       isActive ? 'text-indigo-700 after:scale-x-100' : 'text-gray-800 after:scale-x-0'
//     }`
//   }
// >
//   HOME
// </NavLink>

// <NavLink
//   to="/doctors"
//   className={({ isActive }) =>
//     `relative after:content-[''] after:absolute after:h-[2px] after:w-full after:bg-indigo-600 after:left-0 after:-bottom-1 after:origin-left after:transition-transform hover:text-indigo-700 hover:after:scale-x-100 ${
//       isActive ? 'text-indigo-700 after:scale-x-100' : 'text-gray-800 after:scale-x-0'
//     }`
//   }
// >
//   ALL DOCTORS
// </NavLink>

// <NavLink
//   to="/about"
//   className={({ isActive }) =>
//     `relative after:content-[''] after:absolute after:h-[2px] after:w-full after:bg-indigo-600 after:left-0 after:-bottom-1 after:origin-left after:transition-transform hover:text-indigo-700 hover:after:scale-x-100 ${
//       isActive ? 'text-indigo-700 after:scale-x-100' : 'text-gray-800 after:scale-x-0'
//     }`
//   }
// >
//   ABOUT
// </NavLink>

// <NavLink
//   to="/contact"
//   className={({ isActive }) =>
//     `relative after:content-[''] after:absolute after:h-[2px] after:w-full after:bg-indigo-600 after:left-0 after:-bottom-1 after:origin-left after:transition-transform hover:text-indigo-700 hover:after:scale-x-100 ${
//       isActive ? 'text-indigo-700 after:scale-x-100' : 'text-gray-800 after:scale-x-0'
//     }`
//   }
// >
//   CONTACT
// </NavLink>




//       </div>
//     {
//   token && userData ? (
//     <div className="relative inline-block text-left mr-20">
//       <div
//         className="flex items-center space-x-2 cursor-pointer "
//         onClick={() => setOpen(!open)}
//       >
//         <img src={userData.image} alt="Profile" className="w-10 h-10 rounded-full " />
//         <img src={assets.dropdown_icon} alt="Dropdown" className="w-4 h-4" />
//       </div>

//       {open && (
//         <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
//           <a onClick={()=>{navigate('my-profile')}}
//             href="/profile"
//             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//           >
//             My Profile
//           </a>
//           <a onClick={()=>{navigate('my-appointments')}}
//             href="/my-appointments"
//             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//           >
//             My Appointments
//           </a>
//           <button onClick={logout}
            
//             className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
//           >
//             Logout
//           </button>
//         </div>
//       )}
//     </div>
//   ) : (
//     <button
//       onClick={() => navigate('/login')}
//       className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-full text-sm"
//     >
//       Create account
//     </button>
//   )
// }

//     </nav>
// </div>
   
//   )
// }

// export default Navbar