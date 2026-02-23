import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile = () => {
  const { token, setToken, userData, setUserData, loadUserprofileData, backendurl } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(null);

  const updateuserprofile = async () => {
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('gender', userData.gender);
      formData.append('dob', userData.dob);
      formData.append('address', userData.address); // ✅ single-line address

      if (image) {
        formData.append('image', image);
      }

      const { data } = await axios.post(
        `${backendurl}/api/users/update-profile`,
        formData,
        {
          headers: { token }
        }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserprofileData();
        setIsEditing(false);
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong while updating profile');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  return userData && (
    <div className="pt-20 pl-20">
      {/* Profile Image */}
      <div className="flex items-center space-x-6">
        {isEditing ? (
          <label htmlFor="image" className="cursor-pointer">
           <img className="w-36 h-36 rounded-full object-cover border border-gray-300"
              src={
              image
              ? URL.createObjectURL(image)
              : userData.image
              ? `${backendurl}/${userData.image}`
              : assets.upload_icon
                  }
  alt="profile"
/>
            <input
              type="file"
              id="image"
              hidden
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setImage(file);
                  setUserData((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
                }
              }}
            />
          </label>
        ) : (
          <img
            className="w-36 h-36 object-cover rounded"
            src={userData.image || assets.upload_icon}
            alt="profile"
          />
        )}
      </div>

      {/* Name */}
      <div className="mt-6 flex items-center">
        {/* <span className="w-24 text-sm">Name:</span> */}
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            className="text-sm border border-gray-300 rounded px-2 py-1"
          />
        ) : (
          <h2 className="text-xl font-semibold">{userData.name}</h2>
        )}
      </div>

      <hr className="border-t border-gray-300 w-1/2 my-2 mt-4" />

      {/* Contact Information */}
      <div className="mt-6">
        <h3 className="text-sm text-gray-500 font-semibold mb-5">CONTACT INFORMATION</h3>
        <div className="space-y-2">
          <div className="flex">
            <span className="w-24 text-sm">Email:</span>
            <span className="text-sm text-blue-600">{userData.email}</span>
          </div>
          <div className="flex">
            <span className="w-24 text-sm">Phone:</span>
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={userData.phone}
                onChange={handleChange}
                className="text-sm border border-gray-300 rounded px-2 py-1"
              />
            ) : (
              <span className="text-sm text-blue-600">{userData.phone}</span>
            )}
          </div>
          <div className="flex">
            <span className="w-24 text-sm">Address:</span>
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={userData.address || ''}
                onChange={handleChange}
                placeholder="Enter Address"
                className="text-sm border border-gray-300 rounded px-2 py-1 w-full"
              />
            ) : (
              <span className="text-sm">{userData.address || 'N/A'}</span>
            )}
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div className="mt-6">
        <h3 className="text-sm text-gray-500 font-semibold mb-5">BASIC INFORMATION</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <span className="w-24 text-sm">Gender:</span>
            {isEditing ? (
              <div className="flex gap-4 text-sm">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={userData.gender === 'Male'}
                    onChange={handleChange}
                    className="mr-1"
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={userData.gender === 'Female'}
                    onChange={handleChange}
                    className="mr-1"
                  />
                  Female
                </label>
              </div>
            ) : (
              <span className="text-sm">{userData.gender}</span>
            )}
          </div>

          <div className="flex items-center">
            <span className="w-24 text-sm">Birthday:</span>
            {isEditing ? (
              <input
                type="date"
                name="dob"
                value={userData.dob ? userData.dob.slice(0, 10) : ''}
                onChange={handleChange}
                className="text-sm border border-gray-300 rounded px-2 py-1"
              />
            ) : (
              <span className="text-sm">
                {new Date(userData.dob).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex space-x-4">
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="border px-5 py-2 rounded-full text-sm hover:bg-indigo-500 hover:text-indigo-100"
          >
            Edit
          </button>
        ) : (
          <button
            onClick={updateuserprofile}
            className="border px-5 py-2 rounded-full text-sm hover:bg-indigo-500 hover:text-indigo-100"
          >
            Save Information
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
