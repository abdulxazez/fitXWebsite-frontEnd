  // Dashboard.js - SIMPLIFIED
import React from "react";
import { useContext } from "react";
import { UserQuantityContext } from "../Context/UserQuantityContext";

function Dashboard() {
  const { quantity } = useContext(UserQuantityContext);
  
  // Mock data
  const dashboardData = {
    totalSales: {
      total: 720000,
      thisWeek: 32000,
      today: 6100
    },
    itemsSold: {
      gymItems: 122,
      supplements: 122,
      apparel: 122
    },
    orderTracking: {
      dispatched: 58,
      pendingDispatch: 24,
      delivered: 310,
      returned: 12
    },
    pendingOrders: 123
  };

  return (
    <div className="container-fluid py-4 bg-light">
      <h1 className="text-primary fw-bold ms-3 mb-4">Dashboard</h1>

      {/* Main Stats Row */}
      <div className="row g-4 justify-content-center">
        {/* Total Sales Card */}
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <div className="card text-center shadow-sm border-0 h-100">
            <div className="card-body d-flex flex-column justify-content-between">
              <h4 className="text-primary fw-bold">Total Sales</h4>
              <h3 className="text-dark">PKR {dashboardData.totalSales.total.toLocaleString()}</h3>
              <div>
                <h6 className="mb-1">
                  This Week: <strong>{dashboardData.totalSales.thisWeek.toLocaleString()} Rs</strong>
                </h6>
                <h6>
                  Today: <strong>{dashboardData.totalSales.today.toLocaleString()} Rs</strong>
                </h6>
              </div>
            </div>
          </div>
        </div>

        {/* Users Card - SIMPLIFIED */}
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <div className="card text-center shadow-sm border-0 h-100">
            <div className="card-body d-flex flex-column justify-content-center">
              <h4 className="text-primary fw-bold">Total Users</h4>
              <h1 className="display-4 fw-bolder text-dark my-3">{quantity}</h1>
              <small className="text-muted">
                Updates when users register
              </small>
              {/* Debug button - remove in production */}
              <button 
                className="btn btn-sm btn-outline-secondary mt-2"
                onClick={() => console.log("Current user count:", quantity)}
              >
                Debug: Log Count
              </button>
            </div>
          </div>
        </div>

        {/* Items Sold Card */}
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <div className="card text-center shadow-sm border-0 h-100">
            <div className="card-body d-flex flex-column justify-content-between">
              <h4 className="text-primary fw-bold">Items Sold</h4>
              <div className="mt-3">
                <h6 className="mb-2 text-dark">Gym Items: {dashboardData.itemsSold.gymItems}</h6>
                <h6 className="mb-2 text-dark">Supplements: {dashboardData.itemsSold.supplements}</h6>
                <h6 className="text-dark">Apparel: {dashboardData.itemsSold.apparel}</h6>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Orders Card */}
        <div className="col-12 col-sm-6 col-md-6 col-lg-3">
          <div className="card text-center shadow-sm border-0 h-100">
            <div className="card-body d-flex flex-column justify-content-center">
              <h4 className="text-primary fw-bold">Pending Orders</h4>
              <h1 className="display-4 fw-bolder text-dark my-3">{dashboardData.pendingOrders}</h1>
              <small className="text-muted">Need attention</small>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of your dashboard remains the same */}
      <div className="row g-4 mt-5 justify-content-center">
        <div className="col-12">
          <div className="card shadow-sm border-0 p-4">
            <h3 className="text-primary fw-bold mb-4 text-center">Order Tracking</h3>
            <div className="row g-3 justify-content-center">
              {[
                { label: "Dispatched", value: dashboardData.orderTracking.dispatched, color: "success" },
                { label: "Pending Dispatch", value: dashboardData.orderTracking.pendingDispatch, color: "warning" },
                { label: "Delivered", value: dashboardData.orderTracking.delivered, color: "primary" },
                { label: "Returned", value: dashboardData.orderTracking.returned, color: "danger" }
              ].map((item, index) => (
                <div key={index} className="col-6 col-md-3">
                  <div className={`p-3 border rounded bg-light border-${item.color}`}>
                    <h5 className={`text-${item.color} fw-bold`}>{item.label}</h5>
                    <h4 className="fw-bolder">{item.value}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Product Operations Row */}
      <div className="row g-4 mt-5 justify-content-center">
        <div className="col-12">
          <div className="card shadow-sm border-0 p-4">
            <h3 className="text-primary fw-bold mb-4 text-center">Product Management</h3>
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