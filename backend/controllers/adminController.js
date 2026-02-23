const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Admin = require("../models/adminModel");
const Appointment = require("../models/appointmentModel"); // ✅ Correct model used
const { DoctorModel } = require("../models/DoctorModel");
const userModel = require("../models/userModel");
const appointmentModel = require("../models/appointmentModel");

// Admin Login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(email + password, process.env.JWT_SECERT);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Admin Appointments Fetch
const appointmentsAdmin = async (req, res) => {
  try {
    const allAppointments = await Appointment.find({})
      .populate("userId")
      .populate("docId");

    res.status(200).json({
      success: true,
      appointments: allAppointments,
    });
  } catch (err) {
    console.error("❌ Error in appointmentsAdmin:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

// APi for cancel 
const appointmencancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    appointment.cancelled = true; // ✅ Important
    await appointment.save();

    res.json({ success: true, message: "Appointment cancelled successfully" });
  } catch (err) {
    res.json({ success: false, message: "Something went wrong" });
  }
};

//API for dashboard
const adminDashboard = async (req, res) => {
  try {
    const doctors = await DoctorModel.find({});
    const users = await userModel.find({});
    const appointments = await appointmentModel.find({});

    const dashData = {
      doctors: doctors.length,
      appointments: appointments.length,
      patients: users.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


module.exports = {
  loginAdmin,
  appointmentsAdmin,
  appointmencancel,
  adminDashboard
};
