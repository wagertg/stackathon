import axios from "axios";

export const SET_CART = "SET_CART";
export const CHECKOUT = "CHECKOUT";
export const SET_CART_ITEM_COUNT = "SET_CART_ITEM_COUNT";

const cart = (state = { lineItems: [], itemCount: 0 }, action) => {
  switch (action.type) {
    case SET_CART:
      return action.cart;
    case CHECKOUT:
      return { lineItems: [], itemCount: 0 }; // clear the cart after checkout
    case SET_CART_ITEM_COUNT:
      return { ...state, itemCount: action.itemCount };
    default:
      return state;
  }
};

const _checkout = (reservation) => {
  return {
    type: CHECKOUT,
    reservation,
  };
};

export const _guestCheckout = () => {
  return {
    type: CHECKOUT,
  };
};

const localCart = () => {
  let cart = JSON.parse(window.localStorage.getItem("cart"));
  if (!cart) {
    cart = { lineItems: [] };
    window.localStorage.setItem("cart", JSON.stringify(cart));
  }
  return cart;
};

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
