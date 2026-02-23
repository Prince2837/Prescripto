const express = require('express');
const router = express.Router();
const { DoctorModel } = require('../models/DoctorModel');
const {
  loginDoctor,
  appointmentDoctor,
  appointmentComplete,
  appointmentCancel,
  updateAvailability,
  docotrDashboard,
  doctorProfile,
  updateDoctorProfile
} = require('../controllers/doctorController');
const { authDoctor } = require('../midddlewares/authDoctor');

// Doctor login
router.post("/login", loginDoctor);

// Update availability (requires auth)
router.patch('/doctors/:doctorId/availability', authDoctor, updateAvailability);

// Get appointments for logged-in doctor
router.get("/appointments", authDoctor, appointmentDoctor);

// Complete appointment
router.post("/complete-appointment", authDoctor, appointmentComplete);

// Cancel appointment
router.post("/cancel-appointment", authDoctor, appointmentCancel);

//dashboard 
router.get("/dashboard", authDoctor, docotrDashboard);

//profile 
router.get("/profile", authDoctor, doctorProfile);

// update profile 
router.post("/update-profile", authDoctor, async (req, res) => {
  try {
    const updated = await DoctorModel.findByIdAndUpdate(
      req.doctorId, 
      req.body,
      { new: true }
    );

    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: "Update failed" });
  }
});


module.exports = router;
// const express = require('express');
// const router = express.Router();
// const { DoctorModel } = require('../models/DoctorModel');
// const { loginDoctor, appointmentDoctor,appointmentComplete,appointmentCancel,doctorDashboard,doctorProfile,updateDoctorProfile } = require('../controllers/doctorController'); // ✅ FIX
// const {authDoctor} = require('../midddlewares/authDoctor');

// // Login route
// router.post("/login", loginDoctor);

// // Appointment route
// router.post("/appointments", appointmentDoctor);
// router.post("/complete-appointment",authDoctor,appointmentComplete)
// router.post("/cancel-appointment",authDoctor,appointmentCancel)
// router.get("/dashboard",authDoctor,doctorDashboard)
// router.get('/profile', authDoctor, doctorProfile);

// router.post("/update-profile", authDoctor, async (req, res) => {
//   try {
//     const updated = await DoctorModel.findByIdAndUpdate(
//       req.doctorId,  // from token via authDoctor
//       req.body,
//       { new: true }
//     );

//     res.json({ success: true, data: updated });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Update failed" });
//   }
// });
// // Update availability
// router.patch('/doctors/:id/availability', async (req, res) => {
//   const { id } = req.params;
//   const { available } = req.body;

//   try {
//     const doctor = await DoctorModel.findByIdAndUpdate(
//       id,
//       { available },
//       { new: true }
//     );

//     if (!doctor) {
//       return res.status(404).json({ error: 'Doctor not found' });
//     }

//     res.status(200).json(doctor);
//   } catch (err) {
//     console.error("Error updating doctor availability:", err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// module.exports = router;


