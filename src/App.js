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
import FPassword from "./components/FPassword";
import Register from "./components/Register";
import Nav from "./components/Nav";
import UserCart from "./components/UserCart";
import Admin from "./components/Admin";
import Payment from "./components/paymentPage"; // Import Payment component
import Confirmation from "./components/confirmationPage"; // Import
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
        {!user ? (
          // Render Login and Register for non-logged-in users
          <>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/forgot-password" component={FPassword} />
            {/* Add a Redirect to ensure they can't access other routes */}
            <Redirect to="/login" />
          </>
        ) : (
          <>
            <Nav />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/Contact" component={Contact} />
              <Route path="/userCart" component={UserCart} />
              <Route path="/payment" component={Payment} />
              <Route path="/confirmation" component={Confirmation} />
              <Route path="/admin" component={Admin} />
              {/* Redirect any other routes to the home page */}
              <Route path="*">
                <Redirect to="/" />
              </Route>
            </Switch>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
