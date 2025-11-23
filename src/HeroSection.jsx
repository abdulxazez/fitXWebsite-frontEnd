import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styled from "styled-components";
import img1 from "./assets/HDImg2.jpg";
import img2 from "./assets/HDImg7.jpg";
import img4 from "./assets/HDImg8.jpg";
import img5 from "./assets/HDImg6.jpg";

const MotionLink = styled(motion.a)`
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: yellow;
  border-bottom: 2px solid black;
  text-decoration: none;
  font-size: 1.6rem;
  font-weight: bolder;
  cursor: pointer;

&:hover {
transition: 0.7s ease;
  color: black;
  border-bottom: 2px solid yellow;
  
}
`;

function AnimatedShopNow({ href = "#", children = "Shop Now" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3 });

  return (
    <MotionLink
      ref={ref}
      href={href}
      animate={{
        opacity: inView ? 1 : 0,
        y: inView ? 0 : 50, // drag up
      }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {children}
    </MotionLink>
  );
}

function HeroSection() {
  return (
    <div className="container-fluid mb-3">
      <div className="row g-3">
        {/* LEFT SECTION */}
        <div
          className="col-12 col-lg-6 position-relative"
          style={{
            height: "530px",
            backgroundImage: `url(${img1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <AnimatedShopNow />
        </div>

        {/* RIGHT SECTION */}
        <div className="col-12 col-lg-6 d-flex flex-column justify-content-between">
          {/* Top box */}
          <div
            className="position-relative"
            style={{
              height: "260px",
              backgroundImage: `url(${img4})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <AnimatedShopNow />
          </div>

          {/* Bottom row */}
          <div className="row gx-3 gy-3 mt-1 mb-2">
            <div
              className="col-12 col-md-6 ms-md-2 ms-lg-3 position-relative"
              style={{
                height: "250px",
                backgroundImage: `url(${img2})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <AnimatedShopNow />
            </div>

            <div
              className="col-12 col-md-5 ms-md-4 ms-lg-4 position-relative"
              style={{
                height: "250px",
                border: "1px solid black",
                backgroundImage: `url(${img5})`,
                backgroundSize: "cover",
                backgroundPosition: "center -10px",
                backgroundRepeat: "no-repeat",
              }}
            >
              <AnimatedShopNow />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
