import React from 'react'
import NavBar from './NavBar'
import ShopNow from './ShopNow'
import Featured from './Featured'
import AboutUs from './AboutUs'
import ContactUs from './ContactUs'
import Footer from './Footer'
import HeroSection from './HeroSection'
import BuyNow from './BuyNow'


export default function Home() {
  return (
    <>
      
        <div className="" style={{width:""}}>
          {/* <div className=''>
          <NavBar/>  
        </div> */}
         <div className=''>
          <ShopNow />
        </div>
        <div>
          <Featured />
        </div>
           <div>
          <HeroSection />
        </div> 
        <div>
          <BuyNow name="Weight Machines" />
        </div>
        <div>
          <BuyNow name="Weights" />
        </div>
        <div>
          <BuyNow name="Cardio"/>
        </div>
        {/* <div className='bg-dark'>
          <Footer />
        </div> */}
            
        </div>
        
       
       
    </>
  )
}
