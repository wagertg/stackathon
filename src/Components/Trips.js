import React, { useEffect, useState } from "react";
import axios from "axios";

// The Trips component fetches and displays the user's past trip reservations

const Trips = () => {
  // useState hook initializes and provides setter for trips state

  const [trips, setTrips] = useState([]);

  // useEffect hook to fetch past trip reservations when the component mounts

  useEffect(() => {
    // async function to fetch the data
    const fetchTrips = async () => {
      // getting the token from local storage
      const token = window.localStorage.getItem("token");
      // API call to the server to fetch the data
      const response = await axios.get("/api/reservations/past", {
        headers: {
          authorization: token,
        },
      });
      // setting the fetched data to state
      setTrips(response.data);
    };

    // calling the fetchTrips function

    fetchTrips();
  }, []); // The dependency array is empty, so this effect runs once on mount and not on updates

  return (
    <div>
      <h1 className="heading">MY TRIPS</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: "2%",
        }}
      >
        {trips.map((trip) => (
          <div className="lineitem" key={trip.id}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                lineHeight: "10px",
              }}
            >
              <h2>Reservation ID: {trip.id}</h2>
              <p>Order Date: {new Date(trip.createdAt).toLocaleString()}</p>
              <div>
                {trip.lineItems.map((item) => (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      lineHeight: "5px",
                    }}
                    key={item.id}
                  >
                    <p>Departure Date: {item.flight.date}</p>
                    <p>{item.quantity} Passengers</p>
                    <h1>Enjoy Your Trip to {item.flight.destination}!</h1>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trips;
