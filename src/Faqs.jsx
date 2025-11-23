import React from 'react'
import styled from 'styled-components'

const StyledA = styled.a`
    color: orange;
    text-decoration: none;
      &:hover{
      color: grey;
      }
    `

function Faqs() {
  return (
    <>
    <div className='' style={{
        marginLeft:"50px"
    }} >
            <div className=' '>
                <h1 className='mb-5'>FAQs</h1>
                <h5>How do I place an Order?</h5>
                <p>Shopping on Fitness Depot is easy! <br /> Once you have found the product you want to buy, just follow the steps below </p>
                </div>
            <div className=''>
                <ol>
            <li>Click Add to Cart to add this product to your cart.</li>
            <li> Click on cart icon on the top right corner and click on Checkout</li>
            <li>You will then need to fill in your contact details and preferred shipping address.</li>
            <li>Choose your preferred payment option.</li>
            <li>Click on place order button</li>
        </ol>
            </div>
            <div className=' mt-5'>
                <h5>What sort of products does FitX Sell?</h5>
                <p>FitX sells Gym Equipment of High Quality, Sports Clothing and Gym Supplements off a wide variety </p>
            </div>
            <div className="">
                <h5>How to cancel my order</h5>
                <p>If your order is  not shipped from our warehouse, you can simply cancel your order by getting <br /> in touch width
                    our customer support team. You can reach our team at <StyledA>fitxafitlife@gmail.com</StyledA> or you <br /> can call us at
                    0337-7377330(11am-5pm - Mon to Sat)
                </p>
            </div>

            <div className="">
                <h5>How do I change my order?</h5>
                <p>You may change your order If you order is not yet shipped from our warehouse, you can simply
                    <br />
                cancel you order by getting it touch with our customer support team. You can reach our team
                    <br />
                at <StyledA>fitxafitlife.gmail.com</StyledA> or you can call us at <span className='underline'>03306416413  (10:00 am to 06:00 pm – Mon to Sat)</span>    
                </p>
            </div>
            
            <div className=' mt-5'>
                <h2>Shipping Policy</h2>
                <p>Before we ship your order, we process your order, and verify your information. If we cannotprocess your  order, <br />
                     we will contact you. Availability of items is subject to stock in hand</p>

                <p>Once your order is shipped, a tracking number will be provided to you. If you have any questions, please contact <br />
                     us at these numbers between 10:00 am to 06:00 pm (Mon to Sat) 03306416413 – or send an email at info@fitnessdepot.pk</p>
            </div>
    </div>
        
        
        
        
    </>
  )
}

export default Faqs