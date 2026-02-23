const express = require("express");
const router = express.Router();
const {
  loginAdmin,
  appointmentsAdmin,
  appointmencancel,
  adminDashboard
} = require("../controllers/adminController");

const authadmin = require("../midddlewares/authadmin.js"); // ✅ fixed

router.post("/login", loginAdmin); // no auth on login route
router.get("/appointments", appointmentsAdmin);
router.post("/cancel-appointment", appointmencancel);
router.get("/dashboard", adminDashboard);

module.exports = router;
