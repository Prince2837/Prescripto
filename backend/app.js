require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");


const { DoctorModel } = require("./models/DoctorModel");
const { doctors } = require("./data");
const { storage } = require("./cloudinary"); // Cloudinary config
const   userRouter  = require('./routes/userRoutes');
const adminRouter = require("./routes/adminRoutes")
const doctorRouter = require("./routes/doctorRoutes")
const upload = multer({ storage });

const app = express();

// ================= Middleware =================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // local image fallback



// api endpoints  
app.use("/api/users", userRouter);
app.use("/api/admin",adminRouter);
app.use("/api/doctor",doctorRouter);

// ================= Dummy Data Seeder =================
app.get("/addholdings", async (req, res) => {
  try {
    for (let i = 0; i < doctors.length; i++) {
      const doc = doctors[i];
      const exists = await DoctorModel.findOne({ name: doc.name, speciality: doc.speciality });

      if (!exists) {
        const newDoctor = new DoctorModel({
          customId: `DOC${i + 1}`,
          email:doc.email,
          password:doc.password,
          name: doc.name,
          speciality: doc.speciality,
          degree: doc.degree,
          experience: doc.experience,
          about: doc.about,
          fees: doc.fees,
          address: `${doc.address?.line1 || ""}, ${doc.address?.line2 || ""}`,
          image: doc.image, // This should be a URL (can be Cloudinary or local)
        });
        await newDoctor.save();
        console.log(`✅ Inserted: ${doc.name}`);
      } else {
        console.log(`⚠️ Skipped duplicate: ${doc.name}`);
      }
    }
    res.send("✅ Doctors inserted (duplicates skipped).");
  } catch (error) {
    console.error("❌ Error adding doctors:", error);
    res.status(500).send("Server error while seeding doctors.");
  }
});

// ================= Fetch All Doctors =================
app.get("/api/doctors", async (req, res) => {
  try {
    const allDoctors = await DoctorModel.find({});
    res.json(allDoctors);
  } catch (error) {
    console.error("❌ Error fetching doctors:", error);
    res.status(500).send("Server error while fetching doctors.");
  }
});

// ================= Fetch All (Duplicate of Above - Optional) =================
app.get("/allHoldings", async (req, res) => {
  try {
    const all = await DoctorModel.find({});
    res.json(all);
  } catch (err) {
    console.error("❌ Error fetching all holdings:", err);
    res.status(500).send("Server error.");
  }
});

// ================= Add New Doctor (with Cloudinary Image Upload) =================
app.post("/api/doctors/add", upload.single("image"), async (req, res) => {
  try {
    const {
      customId,
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;

    console.log("🖼️ Image uploaded URL:", req.file?.path); // Debug image path

    const newDoctor = new DoctorModel({
      customId,
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    image: req.file?.path || req.file?.url || req.file?.secure_url || ""
    });

    await newDoctor.save();
    res.status(201).json({
      message: "✅ Doctor added successfully",
      doctor: newDoctor,
    });
  } catch (error) {
    console.error("❌ Error adding doctor:", error);
    res.status(500).json({
      message: "Server error while adding doctor",
      error,
    });
  }
});

// ================= Fetch Doctor by ID =================
app.get("/api/doctors/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid doctor ID" });
  }

  try {
    const doctor = await DoctorModel.findById(id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.json(doctor);
  } catch (error) {
    console.error("❌ Error fetching doctor:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// ================= Delete All Doctors (Dev Only) =================
app.get("/delete-all", async (req, res) => {
  try {
    await DoctorModel.deleteMany({});
    res.send("🗑️ All doctors deleted successfully.");
  } catch (err) {
    res.status(500).send("Failed to delete doctors.");
  }
});

// ================= Root Route =================
app.get("/", (req, res) => {
  res.send("✅ Backend API is running");
});

// ================= DB Connection =================
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(8080, () => {
      console.log("🚀 Server running at http://localhost:8080");
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
