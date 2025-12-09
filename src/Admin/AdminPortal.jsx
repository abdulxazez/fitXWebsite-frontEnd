import React, { useState } from 'react'
import {Link} from "react-router-dom"
import styles from "./admin.module.css"
import { Outlet, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { adminLogin } from '../service/api'


const schema = z.object({
  username: z.string().min(1, {message : "Please Enter username"} ),
  password: z.string().min(1, {message: "Please enter password"})
})
function AdminPortal() {
  const {register, handleSubmit, formState: { errors }} = useForm({
    resolver: zodResolver(schema)
  })
  const location = useLocation()
  const [isLoading, setisLoading] = useState(false)
  const [incorrectPass, setIncorrectPass] = useState(null)
  const [loggedIn, setLoggedIn] = useState(null)

    const logOut = () => {
      setLoggedIn(false);
    }
  const onSubmit = async (data) => {
    try{
      console.log(data);
      if(data.username === "admin" && data.password === "admin123"){
        setLoggedIn(true);
        const result = await adminLogin(data);
        const {token} = result.data;
        console.log("Token: ", token);
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('adminUsername', data.username);
      }else{
        setIncorrectPass("Password or Username is incorrect");
      }
    }catch(error){
       console.log(error);
    }
  }
  return (
    !loggedIn ?
    <>
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.inputGroup}>
        <label htmlFor="email">Email Address</label>
        <input
          type="text"
          id="username"
          placeholder="Enter your username"
          {...register("username")}
        />
        {errors.username && <p className='text-danger'>{errors.username.message}</p>}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          {...register("password")}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <div className={styles.optionsRow}>
        <label className={styles.rememberMe}>
          <input 
            type="checkbox" 
            name="rememberMe"
          />
          Remember me
        </label>
        <a href="#forgot" className={styles.forgotPassword}>
          Forgot password?
        </a>
      </div>

      <button 
        type="submit" 
        className={styles.loginBtn}
     
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </button>
     
    </form> 
    <h6>{setIncorrectPass}</h6>
    </>
    :
    <div className="container-fluid">
        <div className='row'>

            <div  className="col-12 bg-primary" style={{height:"10vh"}}> 
                <h2 className="text-center pt-3 text-light">FitX Admin Portal</h2>
            </div>
        <div className="col-12 col-md-3 col-lg-2 bg-primary pt-5  d-flex flex-column text-center" style={{height:"  "}}>
          <h3>Welcome Back, </h3>
          <h5>{}</h5>
          <button className='btn btn-danger me-4 ms-4 mb-3' onClick={logOut}>logout</button>
          <h6 className='text-white ms-3 mb-5 ' style={{fontSize: "30px"}}>Menu</h6>
            <Link className={styles.link1} to="/admin/" >Dashboard</Link>
            <Link className={styles.link1} to="/admin/products" >Products</Link>
            <Link className={styles.link1} to="/admin/orders" >Orders</Link>
            <Link className={styles.link1} to="/admin/customers" >Customers</Link>
            <Link className={styles.link1} to="/admin/payments" >Payments</Link>
        </div>
        <div className="col-12 col-md-9 col-lg-10 text-white" style={{height: "100vh", backgroundColor: "#d3d3d3"}}>
            
            <Outlet />
        </div>

    </div>
    </div>
  )
}

export default AdminPortal;