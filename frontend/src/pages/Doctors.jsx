import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Doctors = () => {
  const { speciality } = useParams();
  const [doctors, setDoctors] = useState([]);
  const [filterDoc, setFilterDoc] = useState([]);
  const navigate = useNavigate();

  // Fetch data from backend
  useEffect(() => {
    axios.get('http://localhost:8080/api/doctors')
      .then((res) => setDoctors(res.data))
      .catch((err) => console.log("Error fetching doctors:", err));
  }, []);

  // Apply filter when doctors or speciality changes
  useEffect(() => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  }, [doctors, speciality]);

  return (
    <div>
      <p className='text-gray-600 mt-5 ml-8'>Browse through the doctors specialist.</p>
      <div className='flex flex-cols sm:flex-rows items-start gap-5 mt-5 ml-8'>
        {/* Filter Options */}
        <div className='flex flex-col gap-4 text-sm text-gray-600'>
          {['General physician', 'Gynecologist', 'Dermatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist'].map((spec) => (
            <p
              key={spec}
              onClick={() => speciality === spec ? navigate('/doctors') : navigate(`/doctors/${spec}`)}
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 cursor-pointer ${speciality === spec ? "bg-indigo-100 text-black" : ""}`}
            >
              {spec}
            </p>
          ))}
        </div>

        {/* Doctor Cards */}
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mr-5'>
          {filterDoc.map((item, index) => {
            // 🌟 Compute correct image URL:
            const imageUrl = item.image?.trim().startsWith("http")
              ? item.image.trim()
              : `http://localhost:8080/${item.image?.trim()}`;

            return (
              <div
                onClick={() => navigate(`/appointment/${item._id}`)}
                key={index}
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
                   <div className={`flex items-center gap-2 text-sm ${item.available ? "text-green-500" : "text-gray-500"}  mb-1`}>
                <span className={`w-2 h-2 ${item.available ? 'bg-green-500' :"bg-gray-500"} rounded-full`}></span>
                <span>{item.available ? "Available" : "Not Available"}</span>
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


