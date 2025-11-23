import React, { useState } from "react";

function Customers() {
  const [activeSection, setActiveSection] = useState("");
  const [search, setSearch] = useState("");

  // Dummy Customers Data
  const customers = [
    {
      id: "CUST001",
      name: "Ali Khan",
      email: "ali.khan@example.com",
      totalOrders: 5,
      totalAmountPaid: 25000,
    },
    {
      id: "CUST002",
      name: "Sara Ahmed",
      email: "sara.ahmed@example.com",
      totalOrders: 3,
      totalAmountPaid: 15000,
    },
    {
      id: "CUST003",
      name: "Usman Iqbal",
      email: "usman.iqbal@example.com",
      totalOrders: 8,
      totalAmountPaid: 47000,
    },
    {
      id: "CUST004",
      name: "Ayesha Khan",
      email: "ayesha.khan@example.com",
      totalOrders: 2,
      totalAmountPaid: 9000,
    },
    {
      id: "CUST005",
      name: "Bilal Ahmad",
      email: "bilal.ahmad@example.com",
      totalOrders: 4,
      totalAmountPaid: 22000,
    },
  ];

  // Dummy Messages Data
  const messages = [
    {
      name: "Ali Khan",
      email: "ali.khan@example.com",
      message: "My last order arrived late, please look into it.",
    },
    {
      name: "Sara Ahmed",
      email: "sara.ahmed@example.com",
      message: "The product I received was damaged.",
    },
    {
      name: "Usman Iqbal",
      email: "usman.iqbal@example.com",
      message: "I haven’t received tracking details for my order.",
    },
  ];

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container-fluid py-4 bg-light">
      <h1 className="text-primary fw-bold ms-3 mb-4">Customer Management</h1>

      {/* ==== Top Action Cards ==== */}
      <div className="row g-4 justify-content-center">
        {/* View Customers */}
        <div
          className="col-12 col-sm-6 col-md-6 col-lg-3"
          onClick={() => setActiveSection("view")}
          style={{ cursor: "pointer" }}
        >
          <div className="card text-center shadow-sm border-0 p-4 h-100">
            <div className="card-body">
              <i className="bi bi-people-fill text-primary fs-1 mb-3"></i>
              <h4 className="fw-bold text-dark mb-3">View Customers</h4>
              <p className="text-secondary small">
                Browse and search customer records.
              </p>
              <button className="btn btn-primary fw-semibold px-4">
                View Customers
              </button>
            </div>
          </div>
        </div>

        {/* Customer Messages */}
        <div
          className="col-12 col-sm-6 col-md-6 col-lg-3"
          onClick={() => setActiveSection("messages")}
          style={{ cursor: "pointer" }}
        >
          <div className="card text-center shadow-sm border-0 p-4 h-100">
            <div className="card-body">
              <i className="bi bi-chat-dots-fill text-warning fs-1 mb-3"></i>
              <h4 className="fw-bold text-dark mb-3">Customer Messages</h4>
              <p className="text-secondary small">
                View and manage customer feedback & complaints.
              </p>
              <button className="btn btn-warning text-dark fw-semibold px-4">
                View Messages
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ==== Conditional Bottom Section ==== */}
      <div className="container mt-5">
        {/* View Customers Section */}
        {activeSection === "view" && (
          <div className="p-4 bg-white rounded shadow-sm">
            <h4 className="text-primary mb-3">👥 View Customers</h4>

            {/* Search Bar */}
            <div className="mb-4">
              <input
                type="text"
                className="form-control"
                placeholder="Search by name, email, or ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* SCROLLABLE TABLE CONTAINER */}
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle">
                <thead>
                  <tr>
                    <th>Customer ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Total Orders</th>
                    <th>Total Amount Paid (PKR)</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.length > 0 ? (
                    filteredCustomers.map((c) => (
                      <tr key={c.id}>
                        <td>{c.id}</td>
                        <td>{c.name}</td>
                        <td>{c.email}</td>
                        <td>{c.totalOrders}</td>
                        <td>{c.totalAmountPaid.toLocaleString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center text-muted">
                        No matching customers found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Customer Messages Section */}
        {activeSection === "messages" && (
          <div className="p-4 bg-white rounded shadow-sm">
            <h4 className="text-warning mb-4">💬 Customer Messages</h4>

            <div className="row g-4">
              {messages.map((m, index) => (
                <div className="col-12 col-md-6 col-lg-4" key={index}>
                  <div className="card shadow-sm border-0 p-3 h-100">
                    <div className="card-body">
                      <h5 className="card-title text-dark fw-bold">{m.name}</h5>
                      <p className="text-secondary small">{m.email}</p>
                      <p className="text-muted">{m.message}</p>
                      <button className="btn btn-outline-primary btn-sm">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Customers;
