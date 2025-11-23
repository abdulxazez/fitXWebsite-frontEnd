
import Faqs from './Faqs'
function AboutUs() {
  return (
    <>
        <div>
            
        </div>
        <div>
            <div className='d-flex align-items-center justify-content-center' >
                <h1 style={{fontSize:"4rem", marginTop:"50px"}} >About Us</h1>
            </div>
            <div className="mb-5 d-flex flex-column  justify-content-center "style={{marginLeft:"50px", marginRight:"0px", marginTop:"20px"}}>
                <h3>WHO ARE WE?</h3>
                <p>FitX is a fitness based Shopping Store, one of the leading fitness related store in your area; Strength Equipment
                    Clothing, Gym Supplements are sold here all of premium quality, what else would an Athlete want?
                </p>
                <p>
                    Fitness today transcends beyond just the physical aspect of it; it has made its way into the average person’s 
                    everyday life, which ultimately calls for major changes. We at Fitness Depot, not only enable you to achieve your fitness
                     and strength goals, but commit to serve and support our clients throughout their journey with proficient after-sales, latest fitness
                    related content, relevant updates and offers on fitness gear/machinery that we think would best suit your fitness needs.
                </p>

                <h3>WHY CHOOSE US?</h3>
                <p>When it comes to fitness, we vow to offer quality that is uncompromised, unparalleled, and unmatchable. Upholding all international standards of
                engineering, our range of products and services don’t hold back in terms of performance.</p>
                <p>Our mission, undoubtedly, is to serve the fitness community in the long haul, and we are well-equipped with the finest minds of the 
                industry, that are keen on brainstorming and ultimately, working towards the betterment of the fitness community</p>

                <h3>FitX CERTIFIED</h3>
                <p>At Fitness Depot, we understand that when it comes to fitness equipment, quality and trust go hand in hand. 
                    FITX CERTIFIED is our way of assuring our customers that the value being offered by our top of the line
                     products and services, is second to none. We not only desire, but enjoy being reliable in our Industry, 
                     which is why we have put together a panel of fitness equipment-tech experts. These experts hand pick the finest 
                    lot of fitness gear and machinery for our product portfolio, which we now proudly call FitX Certified”.</p>
            </div>
        </div>
        <div className="mt-5">
            <Faqs />
        </div>
    </>
  )
}

export default AboutUs