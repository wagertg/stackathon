import axios from "axios";

// Reducer function that updates the Redux store based on the action received
const auth = (state = {}, action) => {
  if (action.type === "SET_AUTH") {
    // If the action type is 'SET_AUTH', update the state with the new authentication data
    return action.auth;
  }
  // If the action type is not recognized, return the state as-is
  return state;
};

// Action creator for logging out the user
export const logout = () => {
  // Remove the user token from local storage
  window.localStorage.removeItem("token");
  // Dispatch an action to the Redux store to remove the auth data
  return { type: "SET_AUTH", auth: {} };
};

// Thunk for logging in the user with a token
export const loginWithToken = () => {
  return async (dispatch) => {
    // Retrieve the token from local storage
    const token = window.localStorage.getItem("token");
    if (token) {
      // If the token exists, fetch the auth data from the server
      const response = await axios.get("/api/auth", {
        headers: {
          authorization: token,
        },
      });
      // Dispatch an action to the Redux store to update the auth data
      dispatch({ type: "SET_AUTH", auth: response.data });
    }
  };
};

// Thunk for updating the auth data
export const updateAuth = (auth) => {
  return async (dispatch) => {
    // Retrieve the token from local storage
    const token = window.localStorage.getItem("token");
    // Send a request to the server to update the auth data
    const response = await axios.put("/api/auth", auth, {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "SET_AUTH", auth: response.data });
  };
};

// Thunk for logging in the user with a username and password
export const attemptLogin = (credentials) => {
  return async (dispatch) => {
    // Send a request to the server to authenticate the user
    const response = await axios.post("/api/auth", credentials);
    // Store the user token in local storage
    window.localStorage.setItem("token", response.data);
    // Attempt to log in the user with the new token
    dispatch(loginWithToken());
  };
};

// Thunk for registering a new user
export const register = (credentials) => {
  return async (dispatch) => {
    // Send a request to the server to create a new user
    const response = await axios.post("/api/auth/register", credentials);
    // Store the user token in local storage
    window.localStorage.setItem("token", response.data);
    // Attempt to log in the user with the new token
    dispatch(loginWithToken());
  };
};

// Export the auth reducer as the default export
export default auth;
