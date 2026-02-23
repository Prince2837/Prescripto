import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const Appointment = () => {
  const { docId } = useParams();
  const {
    doctors,
    currentSymbol,
    backendurl,
    token,
    getDoctorsData,
    user,
    userData,
  } = useContext(AppContext);
  const daysOfWeek = ['Sun', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const fetchDocInfo = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/doctors/${docId}`);
      const doctorData = res.data;

      // ✅ Ensure slots_booked always exists
      if (!doctorData.slots_booked) {
        doctorData.slots_booked = {};
      }

      setDocInfo(doctorData);
    } catch (err) {
      console.error('Failed to fetch doctor info:', err);
    }
  };

  const getAvailabeleSlots = async () => {
    setDocSlots([]);
    let today = new Date();
    const newDocSlots = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {
        currentDate.setHours(Math.max(currentDate.getHours() + 1, 10));
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        const slotDate = `${day}_${month}_${year}`;
        const slotTime = formattedTime;

        // ✅ Safe access
        const bookedSlots = docInfo.slots_booked || {};
        const isSlotAvailable = !bookedSlots[slotDate]?.includes(slotTime);

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      newDocSlots.push({
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + i),
        slots: timeSlots,
      });
    }

    setDocSlots(newDocSlots);
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book appointment');
      return navigate('/login');
    }

    try {
      const date = docSlots[slotIndex].slots[0].datetime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      const slotDate = `${day}_${month}_${year}`;

      const userId = user?._id;
      const userData = {
        name: user?.name,
        phone: user?.phone,
        gender: user?.gender,
        dob: user?.dob,
        address: user?.address,
      };

      const { data } = await axios.post(
        `${backendurl}/api/users/book-appointment`,
        {
          docId,
          userId,
          userData,
          docData: docInfo,
          slotDate,
          slotTime,
          amount: docInfo.fees,
          date: Date.now(),
        },
        {
          headers: { token },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailabeleSlots();
    }
  }, [docInfo]);

  return (
    docInfo && (
      <div className="px-4 sm:px-8 md:px-12 py-6">
        {/* Doctor Details */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-[#6C63FF] w-full sm:max-w-72 rounded-lg"
              src={
                docInfo.image?.trim().startsWith('http')
                  ? docInfo.image.trim()
                  : `http://localhost:8080/${docInfo.image?.trim()}`
              }
              alt={docInfo.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/300x220?text=No+Image';
              }}
            />
          </div>

          <div className="flex-1 border border-gray-300 rounded-lg p-6 bg-white">
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name}
              <img src={assets.verified_icon} alt="" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {docInfo.experience}
              </button>
            </div>

            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">{docInfo.about}</p>
            </div>

            <p className="text-gray-500 font-medium mt-4">
              Appointment fees: <span className="text-gray-600">₹{docInfo.fees}</span>
            </p>
          </div>
        </div>

        {/* Booking Slots */}
        <div className="sm:ml-72 sm:pl-4 mt-8 font-medium text-gray-700">
          <p className="text-lg mb-2">Booking Slots</p>

          {/* Date Selector */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {docSlots.map((item, index) => (
              <div
                onClick={() => {
                  setSlotIndex(index);
                  setSlotTime('');
                }}
                className={`text-center px-4 py-3 min-w-[60px] rounded-full cursor-pointer whitespace-nowrap ${
                  slotIndex === index
                    ? 'bg-[#6C63FF] text-white'
                    : 'border border-gray-300 text-gray-700 bg-white'
                }`}
                key={index}
              >
                <p className="text-sm font-semibold">
                  {index === 0 ? 'Today' : daysOfWeek[item.date.getDay()]}
                </p>
                <p className="text-sm">{item.date.getDate()}</p>
              </div>
            ))}
          </div>

          {/* Time Slots */}
          <div className="flex flex-wrap gap-3 mt-6">
            {docSlots[slotIndex]?.slots.length > 0 ? (
              docSlots[slotIndex].slots.map((slot, i) => (
                <button
                  key={i}
                  onClick={() => setSlotTime(slot.time)}
                  className={`px-4 py-2 rounded-full text-sm cursor-pointer ${
                    slotTime === slot.time
                      ? 'bg-[#6C63FF] text-white'
                      : 'border border-gray-300 bg-white text-gray-800'
                  }`}
                >
                  {slot.time}
                </button>
              ))
            ) : (
              <p className="text-gray-500">No available slots</p>
            )}
          </div>

          <button
            onClick={bookAppointment}
            className="mt-6 bg-[#6C63FF] text-white py-3 px-6 rounded-full text-center font-semibold text-base hover:bg-[#5851db] transition"
          >
            Book Appointment
          </button>
        </div>

        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointment;



