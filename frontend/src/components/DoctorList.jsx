// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const DoctorList = () => {
//   const [doctors, setDoctors] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:8080/api/doctors')
//       .then((res) => setDoctors(res.data))
//       .catch((err) => console.error('Error fetching doctors:', err));
//   }, []);

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
//       {doctors.map((doc, idx) => (
//         <div key={idx} className="p-4 border rounded shadow">
//           <img src={doc.imageUrl} alt="doctor" className="w-full h-48 object-cover rounded mb-2" />
//           <h2 className="text-lg font-bold">{doc['doctor[name]']}</h2>
//           <p>{doc['doctor[specialization]']}</p>
//           <p>{doc['doctor[email]']}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default DoctorList;
