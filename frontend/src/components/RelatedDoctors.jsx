import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext);
    const navigate = useNavigate()
  const [relDoc, setRelDocs] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );  
      setRelDocs(doctorsData);
    }
  }, [doctors, speciality, docId]);

  return (
      <div>
          <h1 className="text-3xl font-semibold text-center mt-20">Other Doctors to Book</h1>
         <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 pt-6 mt-20 ml-20">
           
        {relDoc.slice(0, 5).map((item, index) => (
          <div onClick={()=>{navigate(`/appointment/${item._id}`)}}
            key={index}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
          >
            <img src={item.image} alt={item.name} className="bg-blue-50 w-full h-[220px] object-cover" />

            <div className="p-4">
               <div className={`flex items-center gap-2 text-sm ${item.available ? "text-green-500" : "text-gray-500"}  mb-1`}>
                <span className={`w-2 h-2 ${item.available ? 'bg-green-500' :"bg-gray-500"} rounded-full`}></span>
                <span>{item.available ? "Available" : "Not Available"}</span>
              </div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-600">{item.speciality}</p>
              
            </div>
          </div>
        ))}
      </div>
      </div>
  );
};

export default RelatedDoctors;
