import React from 'react';
import styled from 'styled-components';
import styles from './footer.module.css'
import { Link } from 'react-router-dom';
const StyledA = styled.p`
  color: white;
  margin: 0.3rem 0;
  cursor: pointer;

  &:hover {
    color: yellow;
  }
`;

function Footer() {
  return (
    <>
      <div
        className="container-fluid bg-dark text-white pt-3 pb-2 "
        style={{
          overflowX: "hidden", // prevent horizontal scroll
        }}
      >
        <div className="row text-center text-md-start g-3 px-3 justify-content-center">
          {/* Contact Us */}
          <div className="col-12 col-md-6 col-lg-3 d-flex flex-column align-items-center">
            <h3>Contact Us</h3>
            <h6>Address:</h6>
            <p className="mb-1">Share Sabala, Riyadh, Saudi Arabia</p>
            <h6>Hotline:</h6>
            <a
              href="#"
              style={{ color: "orange", textDecoration: "none" }}
            >
              0337-7577330
            </a>
            <br />
            <br />
            <h6>Email:</h6>
            <a
              href="#"
              style={{ color: "orange", textDecoration: "none" }}
            >
              fitXafitlife@gmail.com
            </a>
          </div>

          {/* About Us */}
          <div className="col-12 col-md-6 col-lg-3 d-flex flex-column align-items-center ">
            <h3>About Us</h3>
            <Link className={styles.link1} to="/contactUs">Send a Message</Link>
            <Link className={styles.link1} to="/aboutUs">FAQs</Link>
            <Link className={styles.link1} to="/aboutUs">Shipping Policy</Link>
            <Link className={styles.link1} to="/aboutUs">Privacy Policy</Link>
            <Link className={styles.link1} to="/">Supplements</Link>
            <Link className={styles.link1} to="/">Clothing</Link>
          </div>

          {/* More Information */}
          <div className="col-12 col-md-6 col-lg-3 d-flex flex-column align-items-center ">
            <h3>More Information</h3>
            <Link className={styles.link1} to="/">Account</Link>
            <Link className={styles.link1} to="/">Wishlist</Link>
            <Link className={styles.link1} to="/cart">Shopping Cart</Link>
            <Link className={styles.link1} to="/cart">Checkout</Link>
          </div>

          {/* Follow Us */}
          <div className="col-12 col-md-6 col-lg-3 d-flex flex-column align-items-center ">
            <h3>Follow Us</h3>
            <div>
              <i
                className="bi bi-facebook pe-2"
                style={{ color: "white", fontSize: "1.5rem" }}
              ></i>
              <i
                className="bi bi-instagram pe-2"
                style={{ color: "white", fontSize: "1.5rem" }}
              ></i>
              <i
                className="bi bi-youtube"
                style={{ color: "white", fontSize: "1.5rem" }}
              ></i>
            </div>
            <div className="pt-4 ps-5 ms-5">
              <h4>Payments</h4>
              <i className="bi bi-credit-card pe-2"></i>
              <i className="bi bi-paypal pe-2"></i>
              <i className="bi bi-stripe"></i>
            </div>
          </div>
        </div>

        <hr style={{ borderColor: "white", margin: "1rem 0" }} />

        <div className="text-center pb-2">
          <h6 style={{ color: "white", margin: 0 }}>FitX: Copyright © 2025</h6>
        </div>
      </div>
    </>
  );
}

export default Footer;
