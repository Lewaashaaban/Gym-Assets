import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../styles/Register.css";
import { auth } from "../firebase"; // Ensure this import is correct
import { createUserWithEmailAndPassword } from "firebase/auth"; // Import from 'firebase/auth'
import { useStateValue } from "../StateProvider";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [{ user }, dispatch] = useStateValue();

  const handleRegister = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        alert("User registered successfully");
        dispatch({
          type: "SET_USER",
          user: result.user,
        });
        history.push("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="register_container">
      <div className="register">
        <h4>Sign Up</h4>
        <form noValidate autoComplete="off">
          <TextField
            id="standard-basic"
            className="nameField"
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="standard-basic"
            className="passwordField"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            id="userButtons"
            variant="outlined"
            color="secondary"
            onClick={handleRegister}
          >
            Register
          </Button>
          <Link to="/login">
            <Button color="secondary">
              Login <i className="fas fa-arrow-circle-up"></i>
            </Button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
