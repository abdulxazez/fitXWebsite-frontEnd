import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { checkOrder } from "./service/api";

const schema = z.object({
  cardHolderName: z.string().min(1, "Enter cardholder's name"),
  cardNumber: z.string().min(1, "Enter card number"),
  expiration: z.string().min(1, "Enter expiration date"),
  CVV: z.string().min(3, "Minimum 3 digits"),
});

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
    qty: 1,
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

function Cart() {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = 20;
  const total = subtotal + shipping;

  const onSubmit = async (data) => {
    try {
      setIsProcessing(true);
      const res = await checkOrder(data);
      console.log(res);
      
      // Simulate payment processing
      setTimeout(() => {
        setPaymentSuccess(true);
        reset(); // Reset form fields
        setIsProcessing(false);
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          setPaymentSuccess(false);
        }, 5000);
      }, 1500);
      
    } catch (error) {
      console.error(error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container">
        {/* Success Message */}
        {paymentSuccess && (
          <div className="alert alert-success alert-dismissible fade show mb-4" role="alert">
            <div className="d-flex align-items-center">
              <i className="fas fa-check-circle me-3 fs-4"></i>
              <div>
                <h5 className="alert-heading mb-1">Payment Successful!</h5>
                <p className="mb-0">Your order has been confirmed. A receipt has been sent to your email.</p>
              </div>
            </div>
            <button 
              type="button" 
              className="btn-close" 
              onClick={() => setPaymentSuccess(false)}
              aria-label="Close"
            ></button>
          </div>
        )}

        <div className="row g-4">
          {/* Cart Items */}
          <div className="col-lg-8">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h5 className="mb-1">Shopping Cart</h5>
                    <p className="text-muted mb-0">{cartItems.length} items</p>
                  </div>
                  <a href="#!" className="text-decoration-none">
                    <i className="fas fa-long-arrow-alt-left me-2"></i>
                    Continue Shopping
                  </a>
                </div>

                {cartItems.map((item) => (
                  <div className="card mb-3" key={item.id}>
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <img
                            src={item.img}
                            alt={item.name}
                            className="rounded-3 me-3"
                            style={{ width: "80px" }}
                          />
                          <div>
                            <h6 className="mb-1">{item.name}</h6>
                            <p className="text-muted small mb-0">{item.desc}</p>
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-4">
                          <div className="text-center">
                            <p className="mb-0">Qty</p>
                            <h6 className="mb-0">{item.qty}</h6>
                          </div>
                          <div className="text-center">
                            <p className="mb-0">Price</p>
                            <h6 className="mb-0">${item.price}</h6>
                          </div>
                          <button className="btn btn-link text-danger p-0">
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="col-lg-4">
            <div className="card bg-primary text-white">
              <div className="card-body">
                <h5 className="mb-4">Payment Details</h5>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3">
                    <label className="form-label">Cardholder's Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="John Doe"
                      {...register("cardHolderName")}
                    />
                    {errors.cardHolderName && (
                      <small className="text-warning">{errors.cardHolderName.message}</small>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Card Number</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="1234 5678 9012 3457"
                      {...register("cardNumber")}
                    />
                    {errors.cardNumber && (
                      <small className="text-warning">{errors.cardNumber.message}</small>
                    )}
                  </div>

                  <div className="row g-3 mb-4">
                    <div className="col-6">
                      <label className="form-label">Expiration</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="MM/YY"
                        {...register("expiration")}
                      />
                      {errors.expiration && (
                        <small className="text-warning">{errors.expiration.message}</small>
                      )}
                    </div>
                    <div className="col-6">
                      <label className="form-label">CVV</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="•••"
                        {...register("CVV")}
                      />
                      {errors.CVV && (
                        <small className="text-warning">{errors.CVV.message}</small>
                      )}
                    </div>
                  </div>

                  <div className="border-top border-white pt-3 mb-4">
                    <div className="d-flex justify-content-between mb-2">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <strong>Total</strong>
                      <strong>${total.toFixed(2)}</strong>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-light w-100 btn-lg"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Processing...
                      </>
                    ) : (
                      `Pay $${total.toFixed(2)}`
                    )}
                  </button>
                  
                  {paymentSuccess && (
                    <div className="text-center mt-3">
                      <i className="fas fa-check-circle text-success me-2"></i>
                      <span className="text-success">Payment completed successfully!</span>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;