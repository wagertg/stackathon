import axios from "axios";

export const SET_CART = "SET_CART";
export const CHECKOUT = "CHECKOUT";
export const SET_CART_ITEM_COUNT = "SET_CART_ITEM_COUNT";

// This is the reducer for the cart. It takes the current state and an action and
// produces the next state based on the action type.
const cart = (state = { lineItems: [], itemCount: 0 }, action) => {
  // If the action is to set the cart, it takes the cart from the action and uses it as the new state.
  if (action.type === SET_CART) {
    return action.cart;
  }
  // If the action is to checkout, it clears the cart and resets the item count.
  else if (action.type === CHECKOUT) {
    return { lineItems: [], itemCount: 0 };
  }
  // If the action is to set the item count, it takes the current state and modifies
  // the itemCount property with the value provided in the action.
  else if (action.type === SET_CART_ITEM_COUNT) {
    return { ...state, itemCount: action.itemCount };
  }
  // If the action type doesn't match any known actions, the state is returned unchanged.
  else {
    return state;
  }
};

// The _checkout function dispatches a CHECKOUT action with the passed reservation object.

const _checkout = (reservation) => {
  return {
    type: CHECKOUT,
    reservation,
  };
};

// The _guestCheckout function dispatches a CHECKOUT action without any reservation object.

export const _guestCheckout = () => {
  return {
    type: CHECKOUT,
  };
};

// This function retrieves the cart from local storage. If it doesn't exist, it initializes a new one.

const localCart = () => {
  let cart = JSON.parse(window.localStorage.getItem("cart"));
  if (!cart) {
    cart = { lineItems: [] };
    window.localStorage.setItem("cart", JSON.stringify(cart));
  }
  return cart;
};

// This function synchronizes the local cart with the server by posting each line item to the server.
// After synchronization, the local cart is removed from local storage.
const localCartToServer = async () => {
  const cart = localCart();
  const lineItems = cart.lineItems;
  for (let i = 0; i < lineItems.length; i++) {
    const { flight, quantity } = lineItems[i];
    const token = window.localStorage.getItem("token");
    const response = await axios.post(
      "/api/reservations/cart",
      {
        flight,
        quantity,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
  }
  window.localStorage.removeItem("cart");
};

// This action creator fetches the cart from the server if the user is logged in, and from local storage otherwise.

export const fetchCart = () => {
  return async (dispatch, getState) => {
    if (getState().auth.id) {
      await localCartToServer();
      const token = window.localStorage.getItem("token");
      const response = await axios.get("/api/reservations/cart", {
        headers: {
          authorization: token,
        },
      });
      dispatch({ type: SET_CART, cart: response.data });
    } else {
      dispatch({ type: SET_CART, cart: localCart() });
    }
  };
};

// This action creator removes a specified quantity of a flight from the cart, either on the server (if the user is logged in),
// or in local storage (if the user is not logged in).

export const removeFlightFromCart = (flight, quantityToRemove) => {
  return async (dispatch, getState) => {
    if (getState().auth.id) {
      const token = window.localStorage.getItem("token");
      const response = await axios.put(
        "/api/reservations/cart",
        {
          flight,
          quantityToRemove,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch({ type: SET_CART, cart: response.data });
    } else {
      const cart = localCart();
      const lineItem = cart.lineItems.find(
        (lineItem) => lineItem.flight.id === flight.id
      );
      if (lineItem.quantity !== 0) {
        lineItem.quantity--;
      }
      window.localStorage.setItem("cart", JSON.stringify(cart));
      dispatch(fetchCart());
    }
  };
};

// This action creator adds a flight to the cart, either on the server (if the user is logged in),
// or in local storage (if the user is not logged in).

export const addFlightToCart = (flight) => {
  return async (dispatch, getState) => {
    if (getState().auth.id) {
      const token = window.localStorage.getItem("token");
      const response = await axios.post(
        "/api/reservations/cart",
        {
          flight,
          quantity: 1,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch(fetchCart());
    } else {
      const cart = localCart();
      const lineItem = cart.lineItems.find(
        (lineItem) => lineItem.flight.id === flight.id
      );
      if (!lineItem) {
        cart.lineItems.push({ flight, quantity: 1 });
      } else {
        lineItem.quantity++;
      }
      window.localStorage.setItem("cart", JSON.stringify(cart));
      dispatch(fetchCart());
    }
  };
};
// This action creator checks out the cart on the server, which presumably involves making a reservation and clearing the cart.

export const checkout = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const { data: reservation } = await axios.post(
      "/api/reservations/checkout",
      {},
      {
        headers: {
          authorization: token,
        },
      }
    );
    dispatch(_checkout(reservation));

    dispatch({ type: "CLEAR_CART" });
  };
};

export default cart;
