import "./styles/App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Register from "./components/Register";
import Nav from "./components/Nav";
import UserCart from "./components/UserCart";
import Admin from "./components/Admin";
import Payment from "./components/paymentPage"; // Import Payment component
import Confirmation from "./components/confirmationPage"; // Import Confirmation component
import { useStateValue } from "./StateProvider";
import { useEffect, useState } from "react";
import { auth } from "./firebase"; // Ensure correct import
import { onAuthStateChanged } from "firebase/auth"; // Import onAuthStateChanged

function App() {
  const [{ user }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // User is signed in, update the user state
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // User is signed out, clear the user state
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
      setLoading(false); // Set loading to false once auth state is determined
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, [dispatch]);

  if (loading) {
    return <div className="loading">Loading...</div>; // Optional: Add a loading indicator
  }

  return (
    <Router>
      <div className="App">
        {user && <Nav />} {/* Render Nav only if user is authenticated */}
        <Switch>
          <Route exact path="/">
            {user ? <Home /> : <Redirect to="/login" />}
          </Route>
          <Route path="/contact">
            {user ? <Contact /> : <Redirect to="/login" />}
          </Route>
          <Route path="/register">
            {user ? <Redirect to="/" /> : <Register />}
          </Route>
          <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
          <Route path="/userCart">
            {user ? <UserCart /> : <Redirect to="/login" />}
          </Route>
          <Route path="/payment">
            {user ? <Payment /> : <Redirect to="/login" />}
          </Route>
          <Route path="/confirmation">
            {user ? <Confirmation /> : <Redirect to="/login" />}
          </Route>
          <Route path="/admin">
            {user && user.email === "admin@example.com" ? (
              <Admin />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          {/* Add a catch-all route for undefined paths */}
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
