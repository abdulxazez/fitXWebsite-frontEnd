import { useRef } from "react";
import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { postLoginCredentials } from "./service/api.js";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  username: z.string().min(1, { message: "Enter username" }),
  password: z.string().min(1, { message: "Enter password" }),
});

const StyledA = styled.a`
  color: black;
  font-weight: 500;
  text-decoration: none;
  &:hover {
    color: #444;
    text-decoration: underline;
  }
`;

function LoginPage() {

  const navigate = useNavigate()
  const passwordRef = useRef(null);
  const usernameRef = useRef(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
      try{
        console.log("Loging In... ", data)
        await postLoginCredentials(data)
        setTimeout(() => {navigate("/")}, 4000)
      } catch (error) {
        console.log(error)
      } 
    };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <motion.div
        initial={{ opacity: 0, y: -200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="card shadow-lg border-0 p-4 col-10 col-md-6 col-lg-4"
        style={{ backgroundColor: "#FFF176" }}
      >
        <h2 className="text-center fw-bold mb-4">
          Log In to <span className="text-dark">Fit X</span>
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Username */}
          <div className="mb-3">
            <label htmlFor="username" className="form-label fw-semibold">
              Username
            </label>
            <input
              id="username"
              ref={usernameRef}
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
              placeholder="Enter Username"
              {...register("username")}
            />
            {errors.username && (
              <div className="invalid-feedback text-center">
                {errors.username.message}
              </div>
            )}
          </div>

          {/* Password */}
          <div className="mb-2">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <input
              id="password"
              ref={passwordRef}
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              placeholder="Enter Password"
              {...register("password")}
            />
            {errors.password && (
              <div className="invalid-feedback text-center">
                {errors.password.message}
              </div>
            )}
          </div>

          {/* Forgot Password */}
          <div className="text-end mt-2 mb-3">
            <StyledA href="#">Forgot Password?</StyledA>
          </div>

          {/* Login Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="btn btn-dark w-100 fw-bold py-2 shadow-sm"
          >
            Login
          </motion.button>

          {/* Register Link */}
          <div className="text-center mt-4">
            <Link
              to="/loginPage/registeration"
              className="text-decoration-none text-dark"
            >
              <h5 className="fw-bold">Register Now!</h5>
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default LoginPage;
