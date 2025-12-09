// Registeration.js - SIMPLIFIED
import React, { useRef, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addUser } from "./service/api";
import { useNavigate } from "react-router-dom";
import { UserQuantityContext } from "./Context/UserQuantityContext";

const schema = z.object({
  firstName: z.string().min(1, { message: "Enter First Name" }),
  lastName: z.string().min(1, { message: "Enter Last Name" }),
  username: z.string().min(1, { message: "Enter Username" }),
  password: z.string().min(1, { message: "Enter Password" }),
  email: z.string().min(1, { message: "Enter Email" }).email("Invalid Email"),
});

const StyledA = styled.a`
  color: black;
  &:hover {
    color: black;
  }
`;

function Registeration() {
  const navigate = useNavigate();
  const { addUserToCount } = useContext(UserQuantityContext);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      console.log("Sending to backend: ", data);
      
      // Send to backend
      await addUser(data);
      
      console.log("✅ User registered in database");
      
      // Update the user count in context
      addUserToCount();
      console.log("✅ User count incremented in context");
      
      // Reset form
      reset();
      
      // Show success and redirect
      alert("Registration successful! User count updated.");
      navigate("/loginPage");
      
    } catch (error) {
      console.log("❌ Registration error:", error);
      alert("Registration failed. Please try again.");
    } 
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg border-0 p-4 col-10 col-md-6 col-lg-5" style={{ backgroundColor: "#FFF176" }}>
        <h2 className="text-center mb-4 fw-bold">
          Register with <span className="text-dark">Fit X</span>
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Form fields remain the same */}
          <div className="mb-3">
            <label className="form-label fw-semibold">First Name</label>
            <input
              type="text"
              className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
              placeholder="Enter First Name"
              {...register("firstName")}
            />
            {errors.firstName && <div className="invalid-feedback text-center">{errors.firstName.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Last Name</label>
            <input
              type="text"
              className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
              placeholder="Enter Last Name"
              {...register("lastName")}
            />
            {errors.lastName && <div className="invalid-feedback text-center">{errors.lastName.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Username</label>
            <input
              type="text"
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
              placeholder="Choose a Username"
              {...register("username")}
            />
            {errors.username && <div className="invalid-feedback text-center">{errors.username.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              placeholder="Enter Password"
              {...register("password")}
            />
            {errors.password && <div className="invalid-feedback text-center">{errors.password.message}</div>}
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="Enter Email Address"
              {...register("email")}
            />
            {errors.email && <div className="invalid-feedback text-center">{errors.email.message}</div>}
          </div>

          <div className="text-center mb-3">
            <Link to="/loginPage" className="text-decoration-none text-dark">
              Already have an account?
            </Link>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="btn btn-dark w-100 fw-bold py-2 shadow-sm"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registeration;