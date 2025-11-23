import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Payments() {
const [searchOrderId, setSearchOrderId] = useState("");

const [payments] = useState([
{
customerId: "CUST001",
orderId: "ORD001",
date: "2025-10-15",
productId: "PROD001",
productName: "Whey Protein",
price: 250,
status: "Delivered",
},
{
customerId: "CUST002",
orderId: "ORD002",
date: "2025-10-16",
productId: "PROD002",
productName: "Gym Bag",
price: 60,
status: "Not Delivered",
},
{
customerId: "CUST003",
orderId: "ORD003",
date: "2025-10-17",
productId: "PROD003",
productName: "Yoga Mat",
price: 45,
status: "Delivered",
},
{
customerId: "CUST004",
orderId: "ORD004",
date: "2025-10-17",
productId: "PROD004",
productName: "Creatine",
price: 40,
status: "Not Delivered",
},
]);

// Filter payments based on search input
const filteredPayments = payments.filter((payment) =>
payment.orderId.toLowerCase().includes(searchOrderId.toLowerCase())
);

const remainingPayments = payments.filter(
(payment) => payment.status === "Not Delivered"
);

return ( <div className="container mt-5"> <h1 className="text-center text-primary mb-4 fw-bold">Payments Dashboard</h1>

```
  {/* ALL PAYMENTS SECTION */}
  <div className="card mb-5 shadow-sm">
    <div className="card-header bg-dark text-white fw-bold fs-4 d-flex justify-content-between align-items-center">
      <span>All Payments</span>
      <input
        type="text"
        className="form-control w-25"
        placeholder="Filter by Order ID..."
        value={searchOrderId}
        onChange={(e) => setSearchOrderId(e.target.value)}
      />
    </div>
    <div className="card-body">
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Customer ID</th>
              <th>Order ID</th>
              <th>Date</th>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Price ($)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.length > 0 ? (
              filteredPayments.map((payment, index) => (
                <tr key={index}>
                  <td>{payment.customerId}</td>
                  <td>{payment.orderId}</td>
                  <td>{payment.date}</td>
                  <td>{payment.productId}</td>
                  <td>{payment.productName}</td>
                  <td>{payment.price}</td>
                  <td
                    className={
                      payment.status === "Delivered"
                        ? "text-success fw-bold"
                        : "text-danger fw-bold"
                    }
                  >
                    {payment.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted">
                  No results found for "{searchOrderId}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>

  {/* REMAINING PAYMENTS SECTION */}
  <div className="card shadow-sm mb-5">
    <div className="card-header bg-warning fw-bold fs-4">
      Remaining Payments (Not Delivered)
    </div>
    <div className="card-body">
      {remainingPayments.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-warning">
              <tr>
                <th>Customer ID</th>
                <th>Order ID</th>
                <th>Product Name</th>
                <th>Price ($)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {remainingPayments.map((payment, index) => (
                <tr key={index}>
                  <td>{payment.customerId}</td>
                  <td>{payment.orderId}</td>
                  <td>{payment.productName}</td>
                  <td>{payment.price}</td>
                  <td className="text-danger fw-bold">{payment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-success fw-bold">All payments are cleared 🎉</p>
      )}
    </div>
  </div>
</div>


);
}

export default Payments;
