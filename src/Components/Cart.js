import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFlightFromCart,
  addFlightToCart,
  checkout,
  _guestCheckout,
} from "../store/cart";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { styled } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

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

  const totalPrice = cart.lineItems.reduce((total, item) => {
    const done = item.flight.price * item.quantity;
    return total + done;
  }, 0);

  const handleRemove = (flight, quantityToRemove) => {
    dispatch(removeFlightFromCart(flight, quantityToRemove));
  };

  const handleAddToCart = (flight, quantityToAdd) => {
    dispatch(addFlightToCart(flight, quantityToAdd));
  };

  const handleCheckout = () => {
    dispatch(checkout());
  };

  return (
    <div>
      <h1 className="heading">CART</h1>
      <div style={{ marginLeft: "11.5%" }}>
        <BootstrapButton
          variant="outlined"
          onClick={() => {
            navigate("/flights");
          }}
        >
          NOPE, NOT DONE YET
        </BootstrapButton>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: "2%",
        }}
      >
        {cart.lineItems.map((item, index) => (
          <div className="lineitem" key={item.id || index}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexGrow: "inherit",
                margin: "2%",
                alignItems: "center",
                gap: "2rem",
              }}
            >
              <img
                style={{
                  display: !item.flight.image ? "none" : "",
                }}
                width="250"
                height="250"
                src={item.flight.image}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                lineHeight: "15px",
              }}
            >
              <h1>{item.flight.destination}</h1>
              <div style={{ lineHeight: "10px" }}>
                <h4>
                  Date: <span>{item.flight.date}</span>
                </h4>
                <h4>Travel Time: {item.flight.travel}</h4>
                <h4>Distance: {item.flight.distance}</h4>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  lineHeight: "15px",
                }}
              >
                <h4>Passengers: </h4>
                <IconButton
                  color="secondary"
                  disabled={item.quantity < 1}
                  onClick={() => handleRemove(item.flight, 1)}
                >
                  <RemoveIcon />
                </IconButton>
                {item.quantity}
                <IconButton
                  color="secondary"
                  onClick={() => handleAddToCart(item.flight)}
                  variant="contained"
                >
                  <AddIcon />
                </IconButton>
              </div>
              <h4>
                Price: ${(item.quantity * item.flight.price).toLocaleString()}
              </h4>
              <Button
                variant="outlined"
                color="error"
                size="medium"
                startIcon={<DeleteIcon />}
                onClick={() => handleRemove(item.flight, item.quantity)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: "15px",
          margin: "10px",
        }}
      >
        <h2>TOTAL PRICE: ${totalPrice.toLocaleString()}</h2>
        <BootstrapButton
          variant="contained"
          size="medium"
          onClick={() => {
            handleCheckout(), handleClick();
          }}
        >
          Checkout
        </BootstrapButton>
        <Snackbar
          width={100}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%", fontSize: "20px" }}
          >
            Checkout complete! Head to <em>My Trips</em> for more info.
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default Cart;
