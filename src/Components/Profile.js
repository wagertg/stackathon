import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import { InputLabel, Input } from "@mui/material";
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

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { auth } = useSelector((state) => state);
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (auth.id) {
      setUsername(auth.username);
    }
  }, [auth]);

  const _update = async (ev) => {
    ev.preventDefault();
    dispatch(updateAuth({ username }));
  };

  return (
    <>
      <div className="forum">
        <h2 className="heading">Update Profile</h2>
        <Typography component="div">
          <form onSubmit={_update}>
            <FormGroup>
              <FormControl>
                <InputLabel sx={{ color: "white" }} htmlFor="my-input">
                  Username
                </InputLabel>
                <Input
                  placeholder="Username"
                  value={username}
                  onChange={(ev) => setUsername(ev.target.value)}
                  sx={{ color: "white" }}
                  name="username"
                  id="my-input"
                  aria-describedby="my-helper-text"
                />
              </FormControl>
            </FormGroup>

            <BootstrapButton
              disabled={username === auth.username}
              type="submit"
              onClick={handleClick}
              size="large"
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
                Profile Updated!
              </Alert>
            </Snackbar>
          </form>
        </Typography>
      </div>
    </>
  );
};

export default Profile;
