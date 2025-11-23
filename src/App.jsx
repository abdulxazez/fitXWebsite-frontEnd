import { useState } from 'react'
import Home from './Home'
import './App.css'
import { Outlet } from 'react-router-dom'
import LoginPage from './LoginPage'
import NavBar from './NavBar'
import AboutUs from './AboutUs'
import Registeration from './Registeration'
import ContactUs from './ContactUs'
import Footer from './Footer'
import Workers from './Workers'
import BuyNow from './BuyNow'
import Cart from './Cart'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Path from './Path'
import AdminPortal from './Admin/AdminPortal'
<link rel="stylesheet" href="./App.csss" />
function App() {


  return (
    <>
   

          {/* <AdminPortal /> */}
          <NavBar />
          {/* <Path /> */}
          {/* <MidPractice /> */}
          
         {/* <BuyNow /> */}
         <Outlet />
         {/* <Footer /> */}
        {/* <AdminPortal /> */}
         {/* <Cart /> */}
         
        {/* <LoginPage /> */}
        {/* <AboutUs /> */}
        {/* <Registeration /> */}
        {/* <ContactUs/>  */}

       
    </>
  )
}

export default App


