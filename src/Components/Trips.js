import React, { useEffect, useState } from "react";
import axios from "axios";

const Trips = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      const token = window.localStorage.getItem("token");
      const response = await axios.get("/api/reservations/past", {
        headers: {
          authorization: token,
        },
      });
      setTrips(response.data);
    };

    fetchTrips();
  }, []);

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
