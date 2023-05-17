import axios from "axios";

const flights = (state = [], action) => {
  if (action.type === "SET_FLIGHTS") {
    return action.flights;
  }
  if (action.type === "CREATE_FLIGHT") {
    return [...state, action.product];
  }
  return state;
};

export const createFlight = (flight) => {
  return async (dispatch) => {
    const response = await axios.post("/api/flights", flight);
    dispatch({ type: "CREATE_FLIGHT", flight: response.data });
  };
};

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

export const searchFlights = (query) => {
  return async (dispatch) => {
    const response = await axios.get(`/api/flights/search?q=${query}`);
    dispatch({ type: "SET_FLIGHTS", flights: response.data });
  };
};

export default flights;
