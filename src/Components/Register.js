import React, { useState } from "react";
import { register } from "../store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import { InputLabel, Input } from "@mui/material";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import { styled } from "@mui/material/styles";

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

// The Register component provides an interface for users to create a new account

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  // Function to update the credentials state based on user input

  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  // Function to register the user and navigate to the home page

  const _register = async (ev) => {
    ev.preventDefault();
    try {
      await dispatch(register(credentials));
      navigate("/");
    } catch (ex) {
      console.log(ex);
    }
  };
  return (
    <div className="forum">
      <form onSubmit={_register}>
        <h2 className="heading">CREATE ACCOUNT</h2>
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
          <FormControl>
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
        <BootstrapButton type="submit" variant="contained">
          CREATE ACCOUNT
        </BootstrapButton>
      </form>
    </div>
  );
};

export default Register;
