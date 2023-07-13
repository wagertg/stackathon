import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Flights from "./Flights";
import Cart from "./Cart";
import Profile from "./Profile";
import Trips from "./Trips";
import Crew from "./Crew";
import Tech from "./Tech";
import Navbar from "./Navbar";
import News from "./News";
import "../App.css";
import {
  loginWithToken,
  fetchFlights,
  fetchCart,
  addFlightToCart,
} from "../store";

const App = () => {
  const { auth, cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const prevAuth = useRef({});

  // 'useEffect' is a hook from React that performs side effects in function components.
  // The first one is run after the component mounts, and it performs initial data loading.

  useEffect(() => {
    dispatch(loginWithToken()).catch((ex) => {
      dispatch(fetchCart());
    });
    dispatch(fetchFlights());
    if (auth.id) {
      dispatch(addFlightToCart());
    }
  }, []);

  // The second useEffect runs whenever the 'auth' state changes.
  // It checks if the user has logged in or logged out and fetches the cart in either case.

  useEffect(() => {
    if (!prevAuth.current.id && auth.id) {
      console.log("logged in");
      dispatch(fetchCart());
    }
    if (prevAuth.current.id && !auth.id) {
      console.log("logged out");
      dispatch(fetchCart());
    }
  }, [auth]);

  // The third useEffect is run after every render and updates the previous authentication state.

  useEffect(() => {
    prevAuth.current = auth;
  });

  // The component returns a JSX element that contains the application's routes and navigation bar.

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/crew" element={<Crew />} />
        <Route path="/tech" element={<Tech />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/news" element={<News />} />
      </Routes>
    </div>
  );
};

export default App;
