import React, { useEffect, useRef } from "react";
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

import { useSelector, useDispatch } from "react-redux";
import {
  loginWithToken,
  fetchFlights,
  fetchCart,
  addFlightToCart,
  logout,
} from "../store";
import { Link, Routes, Route, useNavigate } from "react-router-dom";

const App = () => {
  const { auth, cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const prevAuth = useRef({});

  useEffect(() => {
    dispatch(loginWithToken()).catch((ex) => {
      dispatch(fetchCart());
    });
    dispatch(fetchFlights());
    if (auth.id) {
      dispatch(addFlightToCart());
    }
  }, []);

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

  useEffect(() => {
    prevAuth.current = auth;
  });

  const _logout = () => {
    dispatch(logout());
    navigate("/");
  };

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
