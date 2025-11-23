import React from "react";
import { useState } from "react";

function Dashboard() {
    const [visit, setVisited] = useState(null)
  return (
    <div className="container-fluid py-4 bg-light">
      <h1 className="text-primary fw-bold ms-3 mb-4">Dashboard</h1>

      {/* === Main Stats Row === */}
      <div className="row g-4 justify-content-center">
        {/* Total Sales */}
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <div
            className="card text-center shadow-sm border-0"
            style={{ minHeight: "200px" }}
          >
            <div className="card-body">
              <h4 className="text-primary fw-bold">Total Sales</h4>
              <h3 className="pt-2 text-dark">PKR 720,000</h3>
              <h6 className="pt-3 mb-1">
                This Week: <strong>32,000 Rs</strong>
              </h6>
              <h6>
                Today: <strong>6,100 Rs</strong>
              </h6>
            </div>
          </div>
        </div>

        {/* Users */}
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <div
            className="card text-center shadow-sm border-0"
            style={{ minHeight: "200px" }}
          >
            <div className="card-body">
              <h4 className="text-primary fw-bold">Users</h4>
              <h1 className="pt-3 text-dark fw-bolder">457</h1>
            </div>
          </div>
        </div>

        {/* Items Sold */}
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <div
            className="card text-center shadow-sm border-0"
            style={{ minHeight: "200px" }}
          >
            <div className="card-body">
              <h4 className="text-primary fw-bold">Items Sold</h4>
              <h6 className="pt-2 mb-1 text-dark">Gym Items: 122</h6>
              <h6 className="mb-1 text-dark">Supplements: 122</h6>
              <h6 className="text-dark">Apparel: 122</h6>
            </div>
          </div>
        </div>

        {/* Pending Orders */}
        <div className="col-12 col-sm-6 col-md-6 col-lg-3">
          <div
            className="card text-center shadow-sm border-0"
            style={{ minHeight: "200px" }}
          >
            <div className="card-body">
              <h4 className="text-primary fw-bold">Pending Orders</h4>
              <h1 className="pt-3 fw-bolder text-dark">123</h1>
            </div>
          </div>
        </div>
      </div>
        <div className="row g-4 mt-5 justify-content-center">
        <div className="col-12">
          <div
            className="card text-center shadow-sm border-0 p-4"
            style={{ backgroundColor: "white" }}
          >
            <h3 className="text-primary fw-bold mb-4">Order Tracking</h3>
            <div className="row g-3 justify-content-center">
              <div className="col-6 col-md-3">
                <div className="p-3 border rounded bg-light">
                  <h5 className="text-success fw-bold">Dispatched</h5>
                  <h4 className="fw-bolder">58</h4>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="p-3 border rounded bg-light">
                  <h5 className="text-warning fw-bold">Pending Dispatch</h5>
                  <h4 className="fw-bolder">24</h4>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="p-3 border rounded bg-light">
                  <h5 className="text-primary fw-bold">Delivered</h5>
                  <h4 className="fw-bolder">310</h4>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="p-3 border rounded bg-light">
                  <h5 className="text-danger fw-bold">Returned</h5>
                  <h4 className="fw-bolder">12</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* === Product Operations Row === */}
      <div className="row g-4 mt-5 justify-content-center">
        <div className="col-12">
          <div
            className="card text-center shadow-sm border-0 p-4"
            style={{ backgroundColor: "white" }}
          >
            <h3 className="text-primary fw-bold mb-4">Product Management</h3>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              <button className="btn btn-outline-primary px-4 py-2 fw-semibold">
                Add Product
              </button>
              <button className="btn btn-outline-danger px-4 py-2 fw-semibold">
                Delete Product
              </button>
              <button className="btn btn-outline-info px-4 py-2 fw-semibold">
                View Products
              </button>
              <button className="btn btn-outline-warning px-4 py-2 fw-semibold">
                Edit Products
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
