const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const  {DoctorModel}  = require("../models/DoctorModel");
const appointmentModel = require("../models/appointmentModel");
const cloudinary = require('cloudinary').v2;
const Razorpay = require('razorpay');
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a Valid Email" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Enter a Strong Password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({ name, email, password: hashedPassword });
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECERT);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      // here generate the token using user id and secert varible which store in env file
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECERT);
      return res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// API to get user profile data
const getProfile = async (req, res) => {
  try {
   const userId = req.userId;
    const userData = await userModel.findById(userId).select("-password");

    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to update user profile
const updateProfile = async (req, res) => {
  try {
    const { name, phone, address, dob, gender } = req.body;
    const userId = req.userId;
    const imageFile = req.file;

    if (!userId || !name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing" });
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address, 
      dob,
      gender,
    });

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "auto",
      });

      await userModel.findByIdAndUpdate(userId, {
        image: imageUpload.secure_url,
      });
    }

    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API of book appointment
const bookappointment = async (req, res) => {
  try {
    const userId = req.userId; // ✅ from token, not from body
    const { docId, slotDate, slotTime } = req.body;

    const docData = await DoctorModel.findById(docId).select("-password");
    if (!docData.available) {
      return res.json({ success: false, message: "Doctor not available" });
    }
    let slots_booked = docData.slots_booked;

    // check slot availability
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot not available" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [slotTime];
    }

    const userData = await userModel.findById(userId).select("-password");
    delete docData.slots_booked;

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    await DoctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment Booked" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const listAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    const appointments = await appointmentModel.find({ userId });
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to cancel appointment// API to cancel appointment
const cancelAppointment = async (req, res) => {
  try {
      const userId = req.userId;
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    // verify appointment user
    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: 'Unauthorized action' });
    }

     await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true});

     //releasing  doctor slots
     const { docId, slotDate, slotTime } = appointmentData;

const doctorData = await DoctorModel.findById(docId);

let slots_booked = doctorData.slots_booked;

slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);

await DoctorModel.findByIdAndUpdate(docId, { slots_booked });
res.json({success:true, message:'Appointment Cancelled'})

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
const paymentRazorpay = async (req, res) => {

  try{
 const { appointmentId } = req.body;

  const appointmentData = await appointmentModel.findById(appointmentId);

  if (!appointmentData || appointmentData.cancelled) {
    return res.json({ success: false, message: "Appointment Cancelled or not found" });
  }

  // Creating options for Razorpay payment
  const options = {
    amount: appointmentData.amount * 100,
    currency: process.env.CURRENCY,
    receipt: appointmentId,
  };

  // Creation of an order
  const order = await razorpayInstance.orders.create(options);

  res.json({ success: true, order });
  }
 catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// API to verify payment of Razorpay
const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    if (orderInfo.status === 'paid') {
      await appointmentModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
      res.json({ success: true, message: "Payment Successful" });
    } else {
      res.json({ success: false, message: "Payment failed" });
    }

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};



module.exports = { registerUser, loginUser, getProfile, updateProfile ,bookappointment , listAppointment , cancelAppointment,paymentRazorpay,verifyRazorpay};
