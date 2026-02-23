const express = require("express");
const upload = require("../midddlewares/upload");


const {registerUser , loginUser, getProfile ,updateProfile ,bookappointment, listAppointment, cancelAppointment, paymentRazorpay, verifyRazorpay} =require("../controllers/userController.js");
const {authUser } = require("../midddlewares/authUser.js");

const userRouter = express.Router()

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser) 
userRouter.get("/get-profile" , authUser,getProfile)
userRouter.post("/update-profile", authUser, upload.single('image'), updateProfile);
userRouter.post('/book-appointment', authUser ,bookappointment)
userRouter.get('/my-appointments', authUser ,listAppointment)
userRouter.post('/cancel-appointment', authUser ,cancelAppointment)
userRouter.post('/payment-razorpay', authUser,paymentRazorpay)
userRouter.post("/verifyRozarpay",authUser,verifyRazorpay)

module.exports = userRouter;

6