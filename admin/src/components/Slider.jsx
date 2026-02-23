import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Calendar, UserPlus, Users, ClipboardList } from 'lucide-react';
import { AdminContext } from '../AdminContext';
import { DoctorContext } from '../DoctorContext';

const navLinkClass = ({ isActive }) =>
  `flex items-center gap-2 py-2 px-3 rounded transition-all
   ${isActive ? "bg-blue-200 text-black" : "hover:bg-blue-100 text-gray-700"}`;

const Slider = () => {
  const { adminToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return (
    <aside className="w-60 bg-white border-r fixed top-16 left-0 h-[calc(100vh-4rem)] z-40">
      {adminToken ? (
        <nav className="flex flex-col gap-1 p-4">
             <NavLink className={navLinkClass} to="/admin-dashboard">
             <ClipboardList size={18} /> Dashboard
             </NavLink>
             <NavLink className={navLinkClass} to="/appointments">
             <Calendar size={18} /> Appointments
             </NavLink>
             <NavLink className={navLinkClass} to="/api/doctors/add">
             <UserPlus size={18} /> Add Doctor
             </NavLink>
             <NavLink className={navLinkClass} to="/api/doctors" end>
             <Users size={18} /> Doctors List
             </NavLink>
        </nav>
      ) : dToken ? (
        <nav className="flex flex-col gap-1 p-4">
          <NavLink className={navLinkClass} to="/doctor-dashboard">
             <ClipboardList size={18} /> Dashboard
             </NavLink>
           <NavLink className={navLinkClass} to="/doctor-appointments">
             <Calendar size={18} /> Appointments
             </NavLink>
              <NavLink className={navLinkClass} to="/doctor-profile">
             <Calendar size={18} /> Profile
             </NavLink>

          {/* You can add more doctor-only links here if needed */}
        </nav>
      ) : null}
    </aside>
  );
};

export default Slider;




// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { Calendar, UserPlus, Users, ClipboardList } from 'lucide-react';

// const navLinkClass = ({ isActive }) =>
//   `flex items-center gap-2 py-2 px-3 rounded transition-all
//    ${isActive ? "bg-blue-200 text-black" : "hover:bg-blue-100 text-gray-700"}`;

// const Slider = () => {
//   return (
//     <aside className="w-60 bg-white border-r fixed top-16 left-0 h-[calc(100vh-4rem)] z-40">
//       <nav className="flex flex-col gap-1 p-4">
//         <NavLink className={navLinkClass} to="/admin-dashboard">
//           <ClipboardList size={18} /> Dashboard
//         </NavLink>
//         <NavLink className={navLinkClass} to="/appointments">
//           <Calendar size={18} /> Appointments
//         </NavLink>
//         <NavLink className={navLinkClass} to="/api/doctors/add">
//   <UserPlus size={18} /> Add Doctor
// </NavLink>
// <NavLink className={navLinkClass} to="/api/doctors" end>
//   <Users size={18} /> Doctors List
// </NavLink>
//       </nav>
//     </aside>
//   );
// };

// export default Slider;