import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../DoctorContext';
import { AdminContext } from '../AdminContext';
import axios from 'axios';

const DoctorProfile = () => {
  const { dToken, profileData, getProfileData } = useContext(DoctorContext);
  const { backendUrl } = useContext(AdminContext);
  const [isEdit, setIsEdit] = useState(false);
  const [localData, setLocalData] = useState(null);

  useEffect(() => {
    if (dToken) getProfileData();
  }, [dToken]);

  useEffect(() => {
    if (profileData) setLocalData({ ...profileData });
  }, [profileData]);

  const handleChange = (field, value) => {
    setLocalData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const res = await axios.post(
        backendUrl + '/api/doctor/update-profile',
        {
          name: localData.name,
          degree: localData.degree,
          speciality: localData.speciality,
          experience: localData.experience,
          about: localData.about,
          fees: localData.fees,
          address: localData.address,
          available: localData.available
        },
        {
          headers: {
            Authorization: `Bearer ${dToken}`
          }
        }
      );

      if (res.data.success) {
        setIsEdit(false);
        getProfileData();
      }
    } catch (err) {
      console.error("Update error:", err.message);
    }
  };

  return localData && (
    <div className="min-h-screen w-full bg-gray-50 py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto bg-white p-12 rounded-3xl shadow-xl flex flex-col md:flex-row gap-12">

        {/* Profile Image with Blue Background */}
        <div className="flex-shrink-0  p-4 rounded-2xl">
          <img 
            src={localData.image}
            alt="Doctor"
            className="w-64 h-64 rounded-2xl object-cover border shadow-lg bg-blue-600"
          />
        </div>

        {/* Doctor Info */}
        <div className="flex-grow space-y-6">
          {/* Name + Degree */}
          <div>
            {isEdit ? (
              <>
                <input
                  type="text"
                  value={localData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="border px-4 py-2 rounded w-full mb-3 text-lg"
                />
                <input
                  type="text"
                  value={localData.degree}
                  onChange={(e) => handleChange('degree', e.target.value)}
                  className="border px-4 py-2 rounded w-full text-lg"
                />
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold text-gray-800">{localData.name}</h2>
                <p className="text-xl text-gray-600 mt-1">{localData.degree} - {localData.speciality}</p>
                <span className="inline-block mt-3 bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold">
                  {localData.experience} Years Experience
                </span>
              </>
            )}
          </div>

          {/* About */}
          <div>
            <p className="text-gray-700 font-semibold text-lg mb-1">About:</p>
            {isEdit ? (
              <textarea
                value={localData.about}
                onChange={(e) => handleChange('about', e.target.value)}
                className="border px-4 py-2 rounded w-full"
                rows={4}
              />
            ) : (
              <p className="text-gray-600 leading-relaxed">{localData.about}</p>
            )}
          </div>

          {/* Fees */}
          <div>
            <p className="text-gray-700 font-semibold text-lg mb-1">Appointment Fee:</p>
            {isEdit ? (
              <input
                type="number"
                value={localData.fees}
                onChange={(e) => handleChange('fees', e.target.value)}
                className="border px-4 py-2 rounded w-40 "
              />
            ) : (
              <p className="text-lg text-gray-800 font-semibold">&#8377; {localData.fees}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <p className="text-gray-700 font-semibold text-lg mb-1">Address:</p>
            {isEdit ? (
              <input
                type="text"
                value={localData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className="border px-4 py-2 rounded w-full"
              />
            ) : (
              <p className="text-gray-600 whitespace-pre-line">{localData.address}</p>
            )}
          </div>

          {/* Availability */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={localData.available}
              onChange={(e) => handleChange('available', e.target.checked)}
              className={`h-5 w-5 rounded ${isEdit ? 'accent-blue-600 cursor-pointer' : 'accent-gray-400 cursor-not-allowed'}`}
              disabled={!isEdit}
            />
            <span className={`text-sm font-semibold ${localData.available ? 'text-green-700' : 'text-red-600'}`}>
              {localData.available ? 'Available' : 'Not Available'}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="pt-6">
            {isEdit ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full mr-4"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setIsEdit(false);
                    setLocalData({ ...profileData });
                  }}
                  className="bg-gray-300 hover:bg-gray-400 text-black font-semibold px-6 py-2 rounded-full"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;

// import React from 'react'
// import { useContext } from 'react'
// import { DoctorContext } from '../DoctorContext'
// import { AdminContext } from '../AdminContext'
// import { useEffect } from 'react'

// const DoctorProfile = () => {

// const{dToken, profileData, getProfileData} = useContext(DoctorContext)
// // const{backendUrl} = useContext(AdminContext)

// useEffect(()=>{
//   if(dToken){
//     getProfileData()
//   }
// },[dToken])

//   return profileData && (
//     <div>
//       <div>
//         <img src={profileData.image} alt="" />
//       </div>

//       <div>
//         {/* Doctor name,degree,experience */}
//         <p>{profileData.name}</p>
//         <div>
//           <p>{profileData.degree} - {profileData.speciality}</p>
//           <button>{profileData.experience}</button>
//         </div>

// {/* Doc About */}
// <div>
//   <p>About:</p>
//   <p>{profileData.about}</p>

// </div>

// <p>Appointment fee: <span> &#8377;{profileData.fees}</span></p>

//       </div>
//     </div>
//   )
// }

// export default DoctorProfile