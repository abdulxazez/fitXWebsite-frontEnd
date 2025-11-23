import { useState } from "react";
import Slider from "react-slick";
import backChest from "./assets/backChest.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Featured() {
  const [hoverIndex, setHoverIndex] = useState(null);

  const featuredItems = [
    { name: "Back and Chest", price: 1200, rating: 4 },
    { name: "Back", price: 900, rating: 5 },
    { name: "Chest Push", price: 850, rating: 4 },
    { name: "Chest Press", price: 950, rating: 4 },
    { name: "Incline Chest", price: 870, rating: 4 },
    { name: "Flat Bench", price: 890, rating: 4 },
  ];

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    swipeToSlide: true,
    responsive: [
      { breakpoint: 1400, settings: { slidesToShow: 5 } },
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 992, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "15px",
        },
      },
    ],
  };

  return (
    <div className="p-4" style={{ maxWidth: "100%", overflow: "hidden" }}>
      
      <div className="d-flex flex-wrap gap-3 mb-4">
        <h5
          className="me-3 fw-bold text-danger pb-1"
          style={{ borderBottom: "2px solid" }}
        >
          Featured
        </h5>
        <h5 className="pe-3">New Products</h5>
        <h5>Best Sellers</h5>
      </div>

      
      <Slider {...settings}>
        {featuredItems.map((item, index) => (
          <div key={index} style={{ padding: "0 10px" }}>
            {/* 👆 Adds spacing between card borders */}

            <div
              id="card"
              className="card shadow-sm mx-auto"
              style={{
                borderRadius: "12px",
                width: "100%",
                height: "350px",
                transition: "transform 0.3s ease",
                border: "1px solid #ccc",
              }}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <img
                src={backChest}
                alt={item.name}
                className="card-img-top"
                style={{
                  height: "200px",
                  width: "120px",
                  objectFit: "cover",
                  borderTopLeftRadius: "12px",
                  borderTopRightRadius: "12px",
                  margin: "auto"
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
                  <a href="#" className="btn btn-outline-success btn-sm">
                    Add to Cart
                  </a>
                ) : (
                  <p className="fw-bold text-success">
                    Price: {item.price} PKR
                  </p>
                  
                )}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Featured;
