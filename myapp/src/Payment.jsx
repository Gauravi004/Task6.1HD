import React, { useMemo } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './payment.css'; // Import CSS

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    alert('Payment processed (demo)');
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <h3>Enter Your Payment Details</h3>
      <CardElement className="card-element" />
      <button type="submit" disabled={!stripe} className="pay-btn">
        Pay Now
      </button>
    </form>
  );
}

export default function PaymentPage() {
  const stripePromise = useMemo(
    () => loadStripe('pk_test_51SI5LIPoBsvxNusTyZpT2K8dKrmKIhNeI6WaoNdXTKAJFPl2OI8JBqpNPpZLZFvx9WqYHCE6LxUFEJcOAFVznd7D004nwh8Ylc'),
    []
  );

  return (
    <div className="payment-page">
      <Elements stripe={stripePromise}>
        <div className="payment-container">
          <h2 className="payment-title">Premium Membership Payment</h2>
          <p className="payment-subtitle">
            Complete your payment securely to unlock premium features.
          </p>
          <CheckoutForm />
        </div>
      </Elements>
    </div>
  );
}
