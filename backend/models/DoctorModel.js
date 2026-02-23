const mongoose = require("mongoose");
const { DoctorSchema } = require('../Schemas/DoctorSchema');

const DoctorModel = mongoose.model("Doctor", DoctorSchema);

module.exports = { DoctorModel };
