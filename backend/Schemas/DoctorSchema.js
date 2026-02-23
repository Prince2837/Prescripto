const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const DoctorSchema = new Schema({
  customId: { type: String, unique: true, sparse: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  speciality: { type: String, required: true },
  degree: { type: String, required: true },
  experience: { type: String, required: true },
  about: { type: String },
  fees: { type: Number, required: true },
  address: { type: String, required: true },
  image: { type: String }, // Image path or URL
  available: { type: Boolean, default: true },
  slots_booked: { type: Object, default: {} },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

// 🔐 Hash password before saving
DoctorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = { DoctorSchema };

// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const DoctorSchema = new Schema({
//   customId: { type: String, unique: true, sparse: true },
//   email:{ type: String, required: true,unique:true },
//   password:{ type: String, required: true },
//   name: { type: String, required: true },
//   speciality: { type: String, required: true },
//   degree: { type: String, required: true },
//   experience: { type: String, required: true },
//   about: { type: String },
//   fees: { type: Number, required: true },
//   address: { type: String, required: true },
//   image: { type: String }, // Image path or URL
//   available: { type: Boolean, default: true },
//   slots_booked: { type: Object, default: {} },
//   date: { type: Date, default: Date.now }
// }, { timestamps: true });

// module.exports = { DoctorSchema };