require("dotenv").config({ path: "../.env" }); // Already correct
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Admin = require("../models/adminModel");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ Connected to DB");
  } catch (err) {
    console.error("❌ DB Error:", err);
  }
};

const createAdmin = async () => {
  const email = process.env.ADMIN_EMAIL;
  const plainPassword = process.env.ADMIN_PASSWORD;

  if (!email || !plainPassword) {
    console.error("❌ Missing ADMIN_EMAIL or ADMIN_PASSWORD in .env");
    process.exit(1);
  }

  try {
    const existing = await Admin.findOne({ email });
    if (existing) {
      console.log("⚠ Admin already exists:", email);
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    const admin = new Admin({ email, password: hashedPassword });

    await admin.save();
    console.log("✅ Admin created successfully:", admin.email);
    process.exit();
  } catch (err) {
    console.error("❌ Error creating admin:", err);
    process.exit(1);
  }
};

connectDB().then(createAdmin);