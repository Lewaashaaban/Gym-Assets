import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../styles/Login.css";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useStateValue } from "../StateProvider";

const Login = () => {
  const [{ user }, dispatch] = useStateValue();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        alert("Log in successful!");
        dispatch({
          type: "SET_USER",
          user: result.user,
        });
        history.push("/");
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  return (
    <div className="login_container">
      <div className="login">
        <h4>Log in</h4>
        <form noValidate autoComplete="off">
          <TextField
            id="standard-basic"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <TextField
            id="standard-basic"
            className="passwordField"
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            id="userButtons"
            variant="outlined"
            color="secondary"
            onClick={handleSubmit}
          >
            Login
          </Button>
          <Link to="/register">
            <Button href="#text-buttons" color="secondary">
              Register<i className="fas fa-arrow-circle-down"></i>
            </Button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
