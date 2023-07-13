import React, { useState } from "react";
import { attemptLogin } from "../store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import { InputLabel, Input } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

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

// The Login component provides an interface for users to enter their credentials and log in to the application

const Login = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State for keeping track of user credentials (username and password)

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  // Functions to open and close Snackbar notification

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // Function to update the credentials state based on user input

  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  // Function to log the user in, navigate to the home page, and display a notification

  const login = (ev) => {
    ev.preventDefault();
    try {
      dispatch(attemptLogin(credentials));
      navigate("/");
      handleClick();
    } catch (ex) {
      console.log(ex);
    }
  };
  return (
    <div className="forum">
      <h2 className="heading">LOGIN</h2>
      <Typography component="div">
        <form onSubmit={login}>
          <FormGroup>
            <FormControl>
              <InputLabel sx={{ color: "white" }} htmlFor="my-input">
                Username
              </InputLabel>
              <Input
                sx={{ color: "white" }}
                placeholder="username"
                value={credentials.username}
                name="username"
                onChange={onChange}
                id="my-input"
                aria-describedby="my-helper-text"
              />
            </FormControl>
          </FormGroup>
          <FormGroup>
            <FormControl sx={{ color: "white" }}>
              <InputLabel sx={{ color: "white" }} htmlFor="my-input">
                Password
              </InputLabel>
              <Input
                sx={{ color: "white" }}
                placeholder="password"
                name="password"
                value={credentials.password}
                onChange={onChange}
                id="my-input"
                aria-describedby="my-helper-text"
              />
            </FormControl>
          </FormGroup>
          <BootstrapButton
            onClick={handleClick}
            size="large"
            type="submit"
            variant="contained"
          >
            LOGIN
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
              Login Successful!
            </Alert>
          </Snackbar>
        </form>
      </Typography>
    </div>
  );
};

export default Login;
