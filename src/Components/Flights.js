import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createFlight, fetchFlights } from "../store/flights";
import { useParams, useNavigate, Link } from "react-router-dom";
import { addFlightToCart } from "../store/cart";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
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

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    width: "100%",
    backgroundColor: "#d0d6f9",
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontFamily: "'Barlow Condensed Regular'",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(16),
    letterSpacing: "2.7",
    marginRight: theme.spacing(1),
    color: "rgba(255, 255, 255, 0.7)",
    "&.Mui-selected": {
      color: "#fff",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "rgba(100, 95, 228, 0.32)",
    },
  })
);

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

// Flights component fetches and displays flights data for users to choose their destination

const Flights = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  // useSelector hook is used to extract the flights data from the Redux store state
  const flights = useSelector((state) => state.flights);
  const [destination, setDestination] = useState("");
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  // Functions to handle opening and closing a Snackbar

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  // useEffect hook fetches the flights data when the component mounts

  useEffect(() => {
    dispatch(fetchFlights());
  }, [dispatch]);

  // filteredFlights represents the flights that match the search query

  const filteredFlights = flights.filter((flight) =>
    flight.destination.toLowerCase().includes(search.toLowerCase())
  );

  // save function creates a new flight and navigates to the flights page

  const save = async (ev) => {
    ev.preventDefault();
    await dispatch(createFlight({ destination }));
    setDestination("");
    navigate("/flights");
  };

  // handleAddToCart function dispatches an action to add a flight to the cart

  const handleAddToCart = (flight) => {
    dispatch(addFlightToCart(flight, 1));
  };

  // handleChange function sets the value state based on the selected tab

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div>
        <h1 className="heading">DESTINATIONS</h1>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <StyledTabs
              value={value}
              onChange={handleChange}
              aria-label="wrapped label tabs example"
              centered
            >
              {filteredFlights.map((flight, index) => {
                return (
                  <StyledTab
                    key={index}
                    label={flight.destination.toUpperCase()}
                    {...a11yProps(0)}
                  />
                );
              })}
            </StyledTabs>
          </Box>
          {filteredFlights.map((flight, index) => {
            return (
              <Box key={index} hidden={value !== index}>
                <div className="destination-info">
                  <img src={flight.image} alt="work" width={450} />
                  <div>
                    <div className="desc">
                      <span>{flight.description} </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "5%",
                      }}
                    >
                      <div className="avg-distance">
                        <h4>Average distance</h4>
                        <span>{flight.distance}</span>
                      </div>
                      <div className="avg-distance">
                        <h4>est. travel time</h4>
                        <span>{flight.travel}</span>
                      </div>
                      <div className="avg-distance">
                        <h4>Date</h4>
                        <span>{flight.date}</span>
                      </div>
                    </div>

                    <BootstrapButton
                      onClick={() => {
                        handleAddToCart(flight), handleClick();
                      }}
                      variant="contained"
                    >
                      RESERVE YOUR SPOT NOW
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
                        {flight.destination} has been added to your cart!
                      </Alert>
                    </Snackbar>
                  </div>
                </div>
              </Box>
            );
          })}
        </Box>
      </div>
    </>
  );
};

export default Flights;
