import axios from "axios";

// This is a reducer function for the Redux store.
// It takes the current state and an action, and returns the new state

const flights = (state = [], action) => {
  if (action.type === "SET_FLIGHTS") {
    return action.flights;
  }
  if (action.type === "CREATE_FLIGHT") {
    return [...state, action.product];
  }
  return state;
};
// This is an action creator function for creating a new flight
// It's an asynchronous function, meaning it will return a function that performs an async operation

export const createFlight = (flight) => {
  return async (dispatch) => {
    const response = await axios.post("/api/flights", flight);
    dispatch({ type: "CREATE_FLIGHT", flight: response.data });
  };
};

// This is an action creator function for fetching all flights

export const fetchFlights = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/flights");
      dispatch({ type: "SET_FLIGHTS", flights: response.data });
    } catch (error) {
      console.error("Error fetching flights:", error);
    }
  };
};

// This is an action creator function for searching flights

export const searchFlights = (query) => {
  return async (dispatch) => {
    const response = await axios.get(`/api/flights/search?q=${query}`);
    dispatch({ type: "SET_FLIGHTS", flights: response.data });
  };
};

export default flights;
