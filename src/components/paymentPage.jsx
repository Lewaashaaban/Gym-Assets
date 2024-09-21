import React, { useState } from "react";
import { useStateValue } from "../StateProvider";
import { Button, TextField } from "@material-ui/core";
import "../styles/PaymentPage.css"; // Add styles as needed

const PaymentPage = () => {
  const [{ basket, user }] = useStateValue();
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handlePayment = () => {
    // Handle payment processing here
    // For example, use Stripe or another payment gateway

    // Simulate payment confirmation
    alert("Payment successful! Your order is being processed.");

    // Optionally, redirect to a confirmation page or clear the basket
    window.location.href = "/confirmation";
  };

  return (
    <div className="payment-page">
      <h2>Payment Information</h2>
      <form>
        <TextField
          label="Card Number"
          type="text"
          value={cardInfo.cardNumber}
          onChange={(e) =>
            setCardInfo({ ...cardInfo, cardNumber: e.target.value })
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="Expiry Date (MM/YY)"
          type="text"
          value={cardInfo.expiryDate}
          onChange={(e) =>
            setCardInfo({ ...cardInfo, expiryDate: e.target.value })
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="CVV"
          type="text"
          value={cardInfo.cvv}
          onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handlePayment}>
          Pay Now
        </Button>
      </form>
    </div>
  );
};

export default PaymentPage;
