import React, { useState, useRef, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";


  const schema = z.object({
      orderId: z.string().min(6,
      {message: "Enter 6 letter Order Id"}
    ) 
  })

function Orders() {
  const {register, handleSubmit, formState: {errors}, reset} = useForm({
    resolver: zodResolver(schema)
  })

  const onSubmit = (data) => {
    console.log(data)
    reset()
  }
  const onSubmit2 = (data) => {
    console.log(data)
    reset()
  }

  const [activeSection, setActiveSection] = useState("");
  const [filter, setFilter] = useState("all");

  const bottomRef = useRef(null);

  useEffect(() => {
    if (activeSection && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeSection]);

  // Dummy orders data
  const orders = [
    {
      id: "ORD001",
      customer: "Ali Khan",
      product: "Whey Protein",
      status: "Dispatched",
      date: "2025-10-14",
      image: "https://m.media-amazon.com/images/I/61J7c4pTzqL._AC_SL1500_.jpg",
    },
    {
      id: "ORD002",
      customer: "Sara Ahmed",
      product: "Dumbbell Set",
      status: "Pending Dispatch",
      date: "2025-10-15",
      image: "https://m.media-amazon.com/images/I/71XW-+lP9nL._AC_SL1500_.jpg",
    },
    {
      id: "ORD003",
      customer: "Usman Iqbal",
      product: "FitX Hoodie",
      status: "Delivered",
      date: "2025-10-12",
      image: "https://m.media-amazon.com/images/I/71QW0i7FgEL._AC_SL1500_.jpg",
    },
    {
      id: "ORD004",
      customer: "Ayesha Khan",
      product: "Resistance Bands",
      status: "Dispatched",
      date: "2025-10-13",
      image: "https://m.media-amazon.com/images/I/71rPM7xXbrL._AC_SL1500_.jpg",
    },
    {
      id: "ORD005",
      customer: "Bilal Ahmad",
      product: "Creatine Monohydrate",
      status: "Pending Dispatch",
      date: "2025-10-16",
      image: "https://m.media-amazon.com/images/I/61As+G5FdfL._AC_SL1500_.jpg",
    },
  ];

  const filteredOrders =
    filter === "all" ? orders : orders.filter((order) => order.status === filter);

  return (
    <div className="container-fluid py-4 bg-light">
      <h1 className="text-primary fw-bold ms-3 mb-4">Order Management</h1>

      {/* ==== Top Cards Row ==== */}
      <div className="row g-4 justify-content-center">
        {[
          { title: "Delete Order", icon: "bi-trash3", color: "danger", key: "delete" },
          { title: "View Orders", icon: "bi-list-ul", color: "primary", key: "view" },
          { title: "Track Orders", icon: "bi-truck", color: "warning", key: "track" },
        ].map((item) => (
          <div
            key={item.key}
            className="col-12 col-sm-6 col-md-6 col-lg-3"
            onClick={() => setActiveSection(item.key)}
            style={{ cursor: "pointer" }}
          >
            <div className="card text-center shadow-sm border-0 p-4 h-100">
              <div className="card-body">
                <i className={`bi ${item.icon} text-${item.color} fs-1 mb-3`}></i>
                <h4 className="fw-bold text-dark mb-3">{item.title}</h4>
                <button className={`btn btn-${item.color} fw-semibold px-4`}>
                  {item.title}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ==== Conditional Bottom Section ==== */}
      <div className="container mt-5" ref={bottomRef}>
        {/* === Delete Order Section === */}
        {activeSection === "delete" && (
          <form onSubmit={handleSubmit(onSubmit)}className="p-4 bg-white rounded shadow-sm">
            <h4 className="text-danger mb-3">🗑️ Delete Order</h4>
            <p>Enter the Order ID you wish to remove:</p>
            <input id="orderId" {...register("orderId")} type="text" className="form-control mb-3" placeholder="Enter Order ID" />
            {errors.orderId && <p className="text-danger">{errors.orderId.message}</p>}
            <button type="submit" className="btn btn-danger">Delete</button>
          </form>
        )}

        {/* === View Orders Section === */}
        {activeSection === "view" && (
          <div className="p-4 bg-white rounded shadow-sm">
            <h4 className="text-primary mb-3">📦 View All Orders</h4>

            {/* Filter Buttons */}
            <div className="mb-4 d-flex flex-wrap gap-3">
              {["all", "Dispatched", "Pending Dispatch", "Delivered"].map((type) => (
                <button
                  key={type}
                  className={`btn ${
                    filter === type
                      ? type === "all"
                        ? "btn-primary"
                        : type === "Dispatched"
                        ? "btn-success"
                        : type === "Pending Dispatch"
                        ? "btn-warning text-dark"
                        : "btn-info"
                      : "btn-outline-secondary"
                  }`}
                  onClick={() => setFilter(type)}
                >
                  {type === "all" ? "All Orders" : type}
                </button>
              ))}
            </div>

            {/* Responsive Table */}
            <div className="table-responsive shadow-sm rounded">
              <table className="table table-striped table-hover align-middle mb-0 text-center">
                <thead className="table-light">
                  <tr>
                    <th style={{ width: "10%" }}>Order ID</th>
                    <th style={{ width: "20%" }}>Customer</th>
                    <th style={{ width: "20%" }}>Product</th>
                    <th style={{ width: "15%" }}>Status</th>
                    <th style={{ width: "15%" }}>Date</th>
                    <th style={{ width: "20%" }}>Image</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((o) => (
                      <tr key={o.id}>
                        <td>{o.id}</td>
                        <td>{o.customer}</td>
                        <td>{o.product}</td>
                        <td
                          className={
                            o.status === "Delivered"
                              ? "text-success fw-bold"
                              : o.status === "Dispatched"
                              ? "text-primary fw-bold"
                              : "text-warning fw-bold"
                          }
                        >
                          {o.status}
                        </td>
                        <td>{o.date}</td>
                        <td>
                          <img
                            src={o.image}
                            alt={o.product}
                            width="60"
                            height="60"
                            className="rounded"
                            style={{ objectFit: "cover" }}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center text-muted">
                        No orders found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* === Track Orders Section === */}
        {activeSection === "track" && (
          <form  onSubmit={handleSubmit(onSubmit2)} className="p-4 bg-white rounded shadow-sm">
            <h4 className="text-warning mb-3">🚚 Track Orders</h4>
            <p>Check if an order is dispatched or pending dispatch.</p>
            <input
              type="text"
              className="form-control mb-3"
              id="orderId"
              placeholder="Enter Order ID to track"
              {...register("orderId")}
            />
            {errors.orderId && <p className="text-danger">{errors.orderId.message}</p>}
            <button type="submit" className="btn btn-warning text-dark">Track</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Orders;
