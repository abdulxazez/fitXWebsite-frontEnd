import { useState } from "react";
import Slider from "react-slick";
import backChest from "./assets/backChest.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function BuyNow({name}) {
  const [hoverIndex, setHoverIndex] = useState(null);

  const featuredItems = [
    { name: "Back and Chest", price: 1200, rating: 4 },
    { name: "Back", price: 900, rating: 5 },
    { name: "Chest Push", price: 850, rating: 4 },
    { name: "Chest Press", price: 950, rating: 4 },
    { name: "Incline Chest", price: 870, rating: 4 },
    { name: "Flat Bench", price: 890, rating: 1 },
  ];

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 2500, // xl and below
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 1200, // lg and below
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 992, // md and below
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600, // sm and below
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "20px",
        },
    }
    ],
  };

  return (
    <>
      <div
        className="container-fluid mt-1 px-4"
        style={{
       
        }}
      >
        <div className="row">
          {/* LEFT CARD */}
          <div className="col-12 col-md-5 col-lg-3 mb-4 mt-3">
            <div className="card mx-auto shadow-sm" style={{ borderRadius: "12px", backgroundImage: `url(${backChest})`,
                                                            backgroundColor:"rgba(0,0,0,0.5)",
                                                            backgroundSize: "200px auto",
                                                            backgroundPosition: "center",
                                                            backgroundRepeat: "no-repeat", height:"500px",
                                                            backgroundBlendMode: "darken"
                                                            }}>
              <h2   
              className="mx-auto"
              style={{
    color: "white",
    fontWeight: "bold",
    textShadow: "2px 2px 5px rgba(0,0,0,0.8)",
    marginTop: "380px",
  }}>{name}</h2>
              
            </div>
          </div>

          {/* RIGHT CAROUSEL */}
          
          <div className="col-12 col-md-7 col-lg-9 mt-5">
           <div className="d-flex justify-content-between align-items-center mt-md-2">
            <h3 className="ms-4 mb-0">Featured</h3>
            <a href="#" className="me-4">View All <i className="bi bi-arrow-right"></i></a>
           </div>
            
            <div style={{ padding: "0 15px" }}>
              <Slider {...settings}>
                {featuredItems.map((item, index) => (
                  <div key={index} className="p-2">
                    <div
                      className="card shadow-sm h-100"
                      style={{
                        borderRadius: "12px",
                        width: "250px",
                        transition: "transform 0.3s ease",
                        border: "1px solid #ccc",
                        overflow: "hidden",
                        
                      }}
                      onMouseEnter={() => setHoverIndex(index)}
                      onMouseLeave={() => setHoverIndex(null)}
                    >
                      <img
                        src={backChest}
                        alt={item.name}
                        className="card-img-top mx-auto bg-dark"
                        style={{
                          height: "220px",
                          width: "100px",
                          objectFit: "cover",
                        }}
                      />
                        
                      <div className="card-body text-center">
                        <h6 className="card-title fw-bold">{item.name}</h6>

                        <p className="mb-2">
                          {Array.from({ length: 5 }, (_, i) => (
                            <span key={i}>{i < item.rating ? "⭐" : "☆"}</span>
                          ))}
                        </p>

                        {hoverIndex === index ? (
                          <p className="fw-bold text-success">
                            Price: {item.price} PKR
                          </p>
                        ) : (
                          <a href="#" className="btn btn-outline-dark btn-sm">
                            Add to Cart
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
        <hr style={{ color: "white" }} />
      </div>
    </>
  );
}

export default BuyNow;
