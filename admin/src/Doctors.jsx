import React, { useEffect, useState, useContext } from 'react';
import {  useParams } from 'react-router-dom';
import axios from 'axios';
import { AdminContext } from './AdminContext'; // ✅ import context

const Doctors = () => {
  const { speciality } = useParams();
  const [doctors, setDoctors] = useState([]);
  const [filterDoc, setFilterDoc] = useState([]);
  // const navigate = useNavigate();

  // ✅ get adminToken from context
  const { adminToken } = useContext(AdminContext);

  // Fetch doctors
  useEffect(() => {
    axios.get('http://localhost:8080/api/doctors')
      .then((res) => setDoctors(res.data))
      .catch((err) => console.log("Error fetching doctors:", err));
  }, []);

  // Filter by speciality
  useEffect(() => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  }, [doctors, speciality]);

  // Toggle availability
const toggleAvailability = (index) => {
  const updatedFilter = [...filterDoc];
  const doctor = updatedFilter[index];
  const newStatus = !doctor.available;

  // Update frontend state for filtered list
  doctor.available = newStatus;
  setFilterDoc(updatedFilter);

  // Also update original doctors state
  const updatedDoctors = doctors.map((doc) =>
    doc._id === doctor._id ? { ...doc, available: newStatus } : doc
  );
  setDoctors(updatedDoctors);

  // Send update to backend
  axios
    .patch(
      `http://localhost:8080/api/doctor/doctors/${doctor._id}/availability`,
      { isAvailable: newStatus },
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    )
    .then((res) => {
      console.log("Doctor status updated");
    })
    .catch((err) => {
      console.error("Error updating availability:", err);
      alert("Failed to update doctor status");
    });
};
  // const toggleAvailability = (index) => {
  //   const updated = [...filterDoc];
  //   const doctor = updated[index];
  //   const newStatus = !doctor.available;

  //   // Update frontend immediately
  //   doctor.available = newStatus;
  //   setFilterDoc(updated);

  //   // Sync with backend
  //   axios.patch(`http://localhost:8080/api/doctors/${doctor._id}/availability`, {
  //     available: newStatus,
  //   })
  //   .then((res) => {
  //     console.log( `Doctor ${doctor.name} status updated`);
  //   })
  //   .catch((err) => {
  //     console.error("Error updating availability:", err);
  //     alert("Failed to update doctor status");
  //   });
  // };

  return (
    <div>
      <p className='text-gray-600 mt-5 ml-8'>All Doctors List</p>
      <div className='flex flex-cols sm:flex-rows items-start gap-5 mt-5 ml-8'>
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mr-5'>
          {filterDoc.map((item, index) => {
            const imageUrl = item.image?.trim().startsWith("http")
              ? item.image.trim()
              : `http://localhost:8080/${item.image?.trim()}`;

            return (
              <div
                key={item._id}
                className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
              >
                <img
                  src={imageUrl}
                  alt={item.name}
                  className="bg-blue-50 w-full h-[220px] object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/300x220?text=No+Image";
                  }}
                />
                <div className="p-4">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          item.available ? "bg-green-500" : "bg-red-500"
                        }`}
                      ></span>
                      <span className={`${item.available ? "text-green-500" : "text-red-500"}`}>
                        {item.available ? "Available" : "Not Available"}
                      </span>
                    </div>
                    <label className="flex items-center gap-1 text-xs text-gray-500">
                      <input
                        type="checkbox"
                        checked={item.available}
                        onChange={() => toggleAvailability(index)}
                      />
                      
                    </label>
                  </div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.speciality}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Doctors;