import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  loginWithToken,
  fetchFlights,
  fetchCart,
  addFlightToCart,
  logout,
} from "../store";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { styled } from "@mui/material/styles";
import planet from "../Images/exxx.png";
import spacex from "../Images/xspace.png";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
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
    textTransform: "uppercase",
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

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { auth, cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const prevAuth = useRef({});
  const open = Boolean(anchorEl);
  const [value, setValue] = useState(0);
  const [openAlert, setOpenAlert] = useState(false);

  const alertClick = () => {
    setOpenAlert(true);
  };

  const alertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    dispatch(loginWithToken()).catch((ex) => {
      dispatch(fetchCart());
    });
    dispatch(fetchFlights());
    if (auth.id) {
      dispatch(addFlightToCart());
    }
  }, []);

  useEffect(() => {
    if (!prevAuth.current.id && auth.id) {
      console.log("logged in");
      dispatch(fetchCart());
    }
    if (prevAuth.current.id && !auth.id) {
      console.log("logged out");
      dispatch(fetchCart());
    }
  }, [auth]);

  useEffect(() => {
    prevAuth.current = auth;
  });

  const _logout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          letterSpacing: "1px",
          justifyItems: "flex-start",
          gap: "10px",
        }}
      >
        <Link to="/">
          <img src={planet} width="30"></img>
        </Link>
        <p style={{ color: "#d0d6f9" }}>
          {" "}
          <em>powered by</em>
        </p>
        <img src={spacex} width="125" height="20"></img>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {auth.id ? (
          <>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <StyledTabs
                value={value}
                onChange={handleChange}
                aria-label="nav tabs example"
              >
                <StyledTab component={Link} label="HOME" to="/" />
                <StyledTab component={Link} label="CREW" to="/crew" />
                <StyledTab component={Link} label="TECHNOLOGY" to="/tech" />
                <StyledTab
                  component={Link}
                  label="DESTINATIONS"
                  to="/flights"
                />
                <StyledTab component={Link} label="NEWS" to="/news" />
              </StyledTabs>
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                </IconButton>
              </Tooltip>
            </Box>

            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleClose}>
                <Link to="/cart">Cart</Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                {" "}
                <Link to="/trips">My Trips</Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                {" "}
                <Link to="/profile">Profile</Link>
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={() => {
                  handleClose();
                  alertClick();

                  dispatch(logout());
                }}
              >
                <ListItemIcon>
                  <Logout fontSize="small" />
                  Logout
                </ListItemIcon>
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
            {
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <StyledTabs
                  value={value}
                  onChange={handleChange}
                  aria-label="nav tabs example"
                >
                  <StyledTab component={Link} label="Home" to="/" />
                  <StyledTab component={Link} label="Crew" to="/crew" />
                  <StyledTab component={Link} label="Technology" to="/tech" />
                  <StyledTab
                    component={Link}
                    label="Destinations"
                    to="/flights"
                  />
                  <StyledTab component={Link} label="NEWS" to="/news" />
                </StyledTabs>
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
            }
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  color: "white",
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleClose}>
                <Link to="/cart">Cart</Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                {" "}
                <Link to="/login">Login</Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to="/register">Register</Link>
              </MenuItem>
            </Menu>
          </>
        )}
      </div>
      <Snackbar
        width={100}
        open={openAlert}
        autoHideDuration={6000}
        onClose={alertClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert
          onClose={alertClose}
          severity="success"
          sx={{ width: "100%", fontSize: "20px" }}
        >
          You are logged out!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Navbar;
