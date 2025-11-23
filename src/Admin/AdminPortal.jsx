import React from 'react'
import {Link} from "react-router-dom"
import styles from "./admin.module.css"
import Dashboard from './Dashboard' 
import { Outlet, useLocation } from 'react-router-dom'

function AdminPortal() {
  const location = useLocation()
  return (
    <div className="container-fluid">
        <div className='row'>

            <div  className="col-12 bg-primary" style={{height:"10vh"}}> 
                <h2 className="text-center pt-3 text-light">FitX Admin Portal</h2>
            </div>
        <div className="col-12 col-md-3 col-lg-2 bg-primary pt-5  d-flex flex-column text-center" style={{height:"  "}}>
          
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