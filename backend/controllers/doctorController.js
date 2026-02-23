const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { DoctorModel } = require("../models/DoctorModel");
const appointmentModel = require("../models/appointmentModel");


// API for doctor Login
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await DoctorModel.findOne({ email });

    if (!doctor) {
      return res.json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);

    if (isMatch) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECERT);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


const updateAvailability = async (req, res) => {
  try {
    const doctorId = req.params.doctorId;
    const { isAvailable } = req.body;

    const doctor = await DoctorModel.findByIdAndUpdate(
      doctorId,
      { available: isAvailable }, // ✅ use correct schema field name
      { new: true }
    );

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.status(200).json({ message: 'Availability updated', doctor });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


//API to get doctor appointment 
const appointmentDoctor = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({ docId: req.doctorId });
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


//API to mark appointment complete for dactor panel
const appointmentComplete = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.json({ success: false, message: 'Appointment not found' });
    }

    if (appointmentData.docId.toString() !== req.doctorId) {
      return res.json({ success: false, message: 'Unauthorized' });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });
    res.json({ success: true, message: 'Appointment marked complete' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to cancel
const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.json({ success: false, message: 'Appointment not found' });
    }

    if (appointmentData.docId.toString() !== req.doctorId) {
      return res.json({ success: false, message: 'Unauthorized' });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
    res.json({ success: true, message: 'Appointment marked complete' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to get doctor dashboard 
const docotrDashboard = async (req, res) => {
  try {
    // console.log('📥 Inside docotrDashboard, doctorId:', req.doctorId); // 👈 Add this line

    const appointments = await appointmentModel.find({ docId: req.doctorId });

    let earnings = 0;
    appointments.forEach((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount;
      }
    });

    let patients = [];
    appointments.forEach((item) => {
      if (!patients.includes(item.userId.toString())) {
        patients.push(item.userId.toString());
      }
    });

    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };

    // console.log('✅ Dashboard data ready:', dashData); // 👈 Add this
    return res.json({ success: true, dashboard: dashData });

  } catch (error) {
    // console.log('❌ Dashboard error:', error.message);
    return res.json({ success: false, message: error.message });
  }
};


//API to get doctor profile 
const doctorProfile = async (req, res) => {
  try {
    const docId = req.doctorId; // ✅ Use value set by authDoctor middleware
    const profileData = await DoctorModel.findById(docId).select('-password');
    res.json({ success: true, profileData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


//API to update doctor profile 
const updateDoctorProfile = async(req,res) =>{
  try{
     const docId = req.doctorId;
    const {fees,address,available} = req.body
     await DoctorModel.findByIdAndUpdate(docId,{fees,address,available})

    res.json({success:true,message:'Profile Updated successfully'})

  }catch(error){
    console.log(error)
    res.json({success:false,message:error.message})
  }
}




module.exports = {
  loginDoctor,
  updateAvailability,
  appointmentDoctor, 
  appointmentComplete, 
  appointmentCancel, 
  docotrDashboard,
  doctorProfile,
  updateDoctorProfile
}