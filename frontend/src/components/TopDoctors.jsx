import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const TopDoctors = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchDocInfo = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/allHoldings`);
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch doctor info:", err);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 my-16 px-4 md:px-10 lg:px-20 text-gray-900">
      <h1 className="text-3xl font-semibold text-center">Top Doctors to Book</h1>
      <p className="text-sm text-center max-w-md">
        Simply browse through our extensive list of trusted doctors.
      </p>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 pt-6">
        {users.slice(0, 10).map((user, index) => (
          <div
            onClick={() => navigate(`/appointment/${user._id}`)}
            key={index}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
          >
            <img
              src={
                user.image?.startsWith("http")
                  ? user.image
                  : `http://localhost:8080${user.image}`
              }
              alt={user.name}
              className="bg-blue-50 w-full h-[220px] object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/300x220?text=No+Image";
              }}
            />

            <div className="p-4">
              <div className={`flex items-center gap-2 text-sm ${user.available ? "text-green-500" : "text-gray-500"}  mb-1`}>
                <span className={`w-2 h-2 ${user.available ? 'bg-green-500' :"bg-gray-500"} rounded-full`}></span>
                <span>{user.available ? "Available" : "Not Available"}</span>
              </div> 
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-gray-600">{user.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          navigate('/doctors');
          scrollTo(0, 0);
        }}
        className="mt-6 px-6 py-2 rounded-full border border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white transition-all duration-300 text-sm"
      >
        More
      </button>
    </div>
  );
};

export default TopDoctors;



 