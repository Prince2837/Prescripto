
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'


import React from 'react'
import Login from './pages/Login'
import About from './pages/About'
import Doctors from './pages/Doctors'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointment from './pages/MyAppointment'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Appointment from './pages/Appointment'
import AddDoctorForm from './components/AddDoctorForm'


const App = () => {
 
  return (
    <div>
      <Navbar/>

      
      
      <Routes>
         {/* <Route path="/main" element={<MainDashboard />} /> */}
        <Route path='/' element={<Home />}/>
        <Route path='/doctors' element={<Doctors/>}/>
         <Route path='/doctors/:speciality' element={<Doctors/>}/>
        <Route path='/login' element={<Login/>}/>
        
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>

        <Route path='/profile' element={<MyProfile/>} />
       <Route path="/my-appointments" element={<MyAppointment />} />

        <Route path="/appointment/:docId" element={<Appointment/>}/>
        <Route path='/api/doctors/add' element={<AddDoctorForm/>}/>
        

      </Routes>
      <Footer/>
    </div>
  )
}

export default App

