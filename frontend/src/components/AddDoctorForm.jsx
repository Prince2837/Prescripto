import React, { useState } from "react";
import axios from "axios";

const AddDoctorForm = () => {
  const [formData, setFormData] = useState({
    customId: "",
    name: "",
    speciality: "",
    degree: "",
    experience: "",
    about: "",
    fees: "",
    address: "",
    image: null, // will store File
  });

  const [previewURL, setPreviewURL] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    setPreviewURL(URL.createObjectURL(file)); // Generate preview
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();

      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      await axios.post("http://localhost:8080/api/doctors/add", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Doctor added successfully!");

      setFormData({
        customId: "",
        name: "",
        speciality: "",
        degree: "",
        experience: "",
        about: "",
        fees: "",
        address: "",
        image: null,
      });
      setPreviewURL(null);
    } catch (err) {
      console.error("Failed to add doctor:", err);
      alert("Error adding doctor");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 border rounded-2xl shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">
        Add New Doctor
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {[
          "customId",
          "name",
          "speciality",
          "degree",
          "fees",
          "address",
          "experience",
          "about",
        ].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
              {field}
            </label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={`Enter ${field}`}
              className="w-full border border-gray-300 focus:border-indigo-500 px-4 py-2 rounded-md shadow-sm focus:outline-none"
              required
            />
          </div>
        ))}

        {/* File input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Image
          </label>
          <input
            id="imageUpload"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-indigo-50 file:text-indigo-700
                      hover:file:bg-indigo-100"
            required
          />
          {previewURL && (
            <div className="mt-3">
              <p className="text-xs text-gray-500">Image preview:</p>
              <img
                src={previewURL}
                alt="Preview"
                className="w-36 h-36 object-cover mt-2 rounded-md border"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-medium py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Add Doctor
        </button>
      </form>
    </div>
  );
};

export default AddDoctorForm;
