import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { auth } from "../firebase"; // Ensure this is correctly set up
import { sendPasswordResetEmail } from "firebase/auth"; // Import the method
import { Link, useHistory } from "react-router-dom";
import "../styles/ForgotPassword.css"; // Optional: add styling

const FPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset message and error
    setError("");

    try {
      await sendPasswordResetEmail(auth, email); // Correct usage
      setMessage("Password reset email sent! Check your inbox.");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="forgot-password">
      <div className="fpass-container">
        <h4>Forgot Password</h4>
        <form onSubmit={handlePasswordReset}>
          <TextField
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="passwordField" // Apply the CSS class
          />
          <Button
            variant="contained"
            color="seconday"
            type="submit"
            className="submit-button" // Apply the CSS class
          >
            Send Password Reset Email
          </Button>

          <Link to="/login">
            <Button color="secondary">Login</Button>
          </Link>
        </form>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default FPassword;
