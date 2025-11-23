import React from "react";
import fitLogo from "./assets/FitLogo.jpg";
import hangingAthlete from "./assets/hangingAthlete.png";

function ShopNow() {
  return (
    <div
      className="d-flex flex-column flex-md-row w-100"
      style={{
        minHeight: "80vh",
        overflow: "hidden",
      }}
    >
      {/* LEFT SECTION */}
      <div
        className="d-flex flex-column justify-content-center align-items-start p-4 p-md-5"
        style={{
          backgroundColor: "black",
          color: "white",
          flex: 1, // ✅ allows proper resizing
          minHeight: "40vh", // ✅ visible even on small screens
        }}
      >
        <h1
          className="fw-bold"
          style={{
            fontSize: "3rem",
            lineHeight: "1.2",
          }}
        >
          Why Fat, When <br /> there's Fit
        </h1>

        <h5
          className="pt-3"
          style={{
            fontFamily: "Times New Roman",
          }}
        >
          Shop Now so you can move from Fat to Fit
        </h5>

        <a
          href="#"
          style={{
            marginTop: "1rem",
            textDecoration: "none",
            borderBottom: "2px solid yellow",
            color: "yellow",
            fontWeight: "bolder",
          }}
        >
          Shop Now
        </a>
      </div>

      {/* RIGHT SECTION */}
      <div
        className="d-flex justify-content-center align-items-center position-relative"
        style={{
          backgroundColor: "black",
          flex: 1,
          minHeight: "40vh", // ✅ keeps it visible on small screens
        }}
      >
        <img
          src={hangingAthlete}
          alt="Athlete"
          style={{
            height: "100%",
            width: "60%",
            objectFit: "contain",
            zIndex: 1,
          }}
        />

        <img
          src={fitLogo}
          alt="Fit Logo"
          style={{
            position: "absolute",
            height: "20%",
            width: "20%",
            top: "10%",
            right: "10%",
            borderRadius: "8px",
            objectFit: "cover",
          }}
        />
      </div>
    </div>
  );
}

export default ShopNow;

