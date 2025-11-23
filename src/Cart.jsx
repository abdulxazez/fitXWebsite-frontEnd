import React from "react";

function Cart() {

  const cartItems = [
    {
      id: 1,
      name: "Iphone 12 Pro",
      desc: "256GB, Navy Blue",
      qty: 2,
      price: 1000,
      img: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp",
    },
    {
      id: 2,
      name: "Samsung Galaxy Note 10",
      desc: "256GB, Navy Blue",
      qty: 2,
      price: 900,
      img: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img2.webp",
    },
    {
      id: 3,
      name: "Canon EOS M50",
      desc: "Onyx Black",
      qty: 1,
      price: 1199,
      img: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img3.webp",
    },
    {
      id: 4,
      name: "MacBook Pro",
      desc: "1TB, Graphite",
      qty: 1,
      price: 1799,
      img: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img4.webp",
    },
  ];

  return (
    <div>
      <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card">
                <div className="card-body p-4">
                  <div className="row">
                    {/* LEFT: Cart Items */}
                    <div className="col-lg-7">
                      <h5 className="mb-3">
                        <a href="#!" className="text-body">
                          <i className="fas fa-long-arrow-alt-left me-2"></i>
                          Continue shopping
                        </a>
                      </h5>
                      <hr />

                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                          <p className="mb-1">Shopping cart</p>
                          <p className="mb-0">
                            You have {cartItems.length} items in your cart
                          </p>
                        </div>
                        <div>
                          <p className="mb-0">
                            <span className="text-muted">Sort by:</span>{" "}
                            <a href="#!" className="text-body">
                              price <i className="fas fa-angle-down mt-1"></i>
                            </a>
                          </p>
                        </div>
                      </div>

                      {/* 🛒 Mapped Cart Items */}
                      {cartItems.map((item) => (
                        <div className="card mb-3" key={item.id}>
                          <div className="card-body">
                            <div className="d-flex justify-content-between">
                              <div className="d-flex flex-row align-items-center">
                                <div>
                                  <img
                                    src={item.img}
                                    className="img-fluid rounded-3"
                                    alt={item.name}
                                    style={{ width: "65px" }}
                                  />
                                </div>
                                <div className="ms-3">
                                  <h5>{item.name}</h5>
                                  <p className="small mb-0">{item.desc}</p>
                                </div>
                              </div>
                              <div className="d-flex flex-row align-items-center">
                                <div style={{ width: "50px" }}>
                                  <h5 className="fw-normal mb-0">{item.qty}</h5>
                                </div>
                                <div style={{ width: "80px" }}>
                                  <h5 className="mb-0">${item.price}</h5>
                                </div>
                                <a href="#!" style={{ color: "#cecece" }}>
                                  <i className="fas fa-trash-alt"></i>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* RIGHT: Card Details */}
                    <div className="col-lg-5">
                      <div className="card bg-primary text-white rounded-3">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center mb-4">
                            <h5 className="mb-0">Card details</h5>
                          
                          </div>

                          <p className="small mb-2">Card type</p>
                          <a href="#!" className="text-white">
                            <i className="fab fa-cc-mastercard fa-2x me-2"></i>
                          </a>
                          <a href="#!" className="text-white">
                            <i className="fab fa-cc-visa fa-2x me-2"></i>
                          </a>
                          <a href="#!" className="text-white">
                            <i className="fab fa-cc-amex fa-2x me-2"></i>
                          </a>
                          <a href="#!" className="text-white">
                            <i className="fab fa-cc-paypal fa-2x"></i>
                          </a>

                          <form className="mt-4">
                            <div className="form-outline form-white mb-4">
                              <input
                                type="text"
                                id="typeName"
                                className="form-control form-control-lg"
                                placeholder="Cardholder's Name"
                              />
                              <label
                                className="form-label"
                                htmlFor="typeName"
                              >
                                Cardholder's Name
                              </label>
                            </div>

                            <div className="form-outline form-white mb-4">
                              <input
                                type="text"
                                id="typeText"
                                className="form-control form-control-lg"
                                placeholder="1234 5678 9012 3457"
                              />
                              <label
                                className="form-label"
                                htmlFor="typeText"
                              >
                                Card Number
                              </label>
                            </div>

                            <div className="row mb-4">
                              <div className="col-md-6">
                                <div className="form-outline form-white">
                                  <input
                                    type="text"
                                    id="typeExp"
                                    className="form-control form-control-lg"
                                    placeholder="MM/YYYY"
                                  />
                                  <label
                                    className="form-label"
                                    htmlFor="typeExp"
                                  >
                                    Expiration
                                  </label>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-outline form-white">
                                  <input
                                    type="password"
                                    id="typeCvv"
                                    className="form-control form-control-lg"
                                    placeholder="•••"
                                  />
                                  <label
                                    className="form-label"
                                    htmlFor="typeCvv"
                                  >
                                    CVV
                                  </label>
                                </div>
                              </div>
                            </div>
                          </form>

                          <hr className="my-4" />

                          <div className="d-flex justify-content-between">
                            <p className="mb-2">Subtotal</p>
                            <p className="mb-2">
                              PKR: :
                              {cartItems
                                .reduce(
                                  (sum, item) => sum + item.price * item.qty,
                                  0
                                )
                                .toFixed(2)}
                            </p>
                          </div>

                          <div className="d-flex justify-content-between">
                            <p className="mb-2">Shipping</p>
                            <p className="mb-2">PKR 20.00</p>
                          </div>

                          <div className="d-flex justify-content-between mb-4">
                            <p className="mb-2">Total (Incl. taxes)</p>
                            <p className="mb-2">
                               PKR: : 
                              {(
                                cartItems.reduce(
                                  (sum, item) => sum + item.price * item.qty,
                                  0
                                ) + 20
                              ).toFixed(2)}
                            </p>
                          </div>

                          <button
                            type="button"
                            className="btn btn-info btn-block btn-lg"
                          >
                            <div className="d-flex justify-content-between">
                              <span>
                                $
                                {(
                                  cartItems.reduce(
                                    (sum, item) => sum + item.price * item.qty,
                                    0
                                  ) + 20
                                ).toFixed(2)}
                              </span>
                              <span>
                                Checkout{" "}
                                <i className="fas fa-long-arrow-alt-right ms-2"></i>
                              </span>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* END RIGHT COLUMN */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Cart;
