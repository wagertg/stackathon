import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFlightFromCart, addFlightToCart, checkout } from "../store/cart";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const BootstrapButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 20,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  fontWeight: "400",
  backgroundColor: "#d0d6f9",
  borderColor: "#d0d6f9",
  color: "black",
  fontFamily: "'Barlow Condensed', sans-serif",
  "&:hover": {
    backgroundColor: "#d0d6f9",
    borderColor: "white",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "green",
    borderColor: "green",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
});

// The cart component represents the UI of the cart, it includes the list of flights in the cart and their details
// and functionality to navigate back to the flights, add or remove flights from the cart, checkout, and display a success message.
const Cart = () => {
  const { cart, auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // This function calculates the total price of the items in the cart
  const totalPrice = cart.lineItems.reduce((total, item) => {
    const done = item.flight.price * item.quantity;
    return total + done;
  }, 0);

  // The handleRemove function dispatches an action to remove a certain quantity of a flight from the cart
  const handleRemove = (flight, quantityToRemove) => {
    dispatch(removeFlightFromCart(flight, quantityToRemove));
  };

  // The handleAddToCart function dispatches an action to add a certain quantity of a flight to the cart
  const handleAddToCart = (flight, quantityToAdd) => {
    dispatch(addFlightToCart(flight, quantityToAdd));
  };

  // The handleCheckout function dispatches an action to checkout
  const handleCheckout = () => {
    dispatch(checkout());
  };

  return (
    <div style={{ padding: "2rem", width: "75%" }}>
      <Typography variant="h3" component="h1" gutterBottom>
        CART
      </Typography>

      <BootstrapButton
        variant="outlined"
        onClick={() => navigate("/flights")}
        style={{ marginBottom: "2rem" }}
      >
        NOPE, NOT DONE YET
      </BootstrapButton>

      {cart.lineItems.map((item, index) => (
        <Paper
          key={item.id || index}
          style={{
            padding: "1rem",
            marginBottom: "1rem",
            backgroundColor: "#fffff",
            opacity: "1.8",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: "3rem",
            }}
          >
            <img
              src={item.flight.image}
              width="250"
              height="250"
              alt="Flight"
              style={{ marginRight: "0rem" }}
            />
            <div style={{ margin: "1%" }}>
              <Typography variant="h5">{item.flight.destination}</Typography>
              <Typography variant="body1">
                Date: {item.flight.date}
                <br />
                Travel Time:{item.flight.travel}
                <br />
                Distance: {item.flight.distance}
              </Typography>
              <div
                style={{ display: "flex", alignItems: "center", gap: "0rem" }}
              >
                <Typography variant="body1">
                  Passengers: {item.quantity}
                </Typography>
                <IconButton
                  color="success"
                  disabled={item.quantity < 1}
                  onClick={() => handleRemove(item.flight, 1)}
                >
                  <RemoveIcon />
                </IconButton>
                <IconButton
                  color="success"
                  onClick={() => handleAddToCart(item.flight)}
                >
                  <AddIcon />
                </IconButton>
              </div>
              <Typography variant="body1">
                Price: ${(item.quantity * item.flight.price).toLocaleString()}
              </Typography>
              <Button
                style={{ marginTop: "2%" }}
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => handleRemove(item.flight, item.quantity)}
              >
                Delete
              </Button>
            </div>
          </div>
        </Paper>
      ))}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "2rem",
        }}
      >
        <Typography variant="h5">
          TOTAL PRICE: ${totalPrice.toLocaleString()}
        </Typography>
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            handleCheckout();
            handleClick();
          }}
        >
          Checkout
        </Button>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Checkout complete! Head to <em>My Trips</em> for more info.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Cart;
