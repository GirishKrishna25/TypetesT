import { Box, Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import errorMapping from "../utils/errorMessages";
import { useAlert } from "../context/AlertContext";
import { useTheme } from "../context/ThemeContext";

const LoginForm = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { theme } = useTheme();

  const { setAlert } = useAlert();

  const handleLogin = () => {
    if (!email || !password) {
      setAlert({
        open: true,
        type: "warning",
        message: "Please enter all details",
      });
      return;
    }

    // this one allows us to login with existing accounts.
    auth
      .signInWithEmailAndPassword(email, password)
      .then((ok) => {
        setAlert({
          open: true,
          type: "success",
          message: "Logged In.",
        });
        handleClose();
      })
      .catch((err) => {
        // console.log(err);
        setAlert({
          open: true,
          type: "error",
          message: errorMapping[err.code] || "some error occured",
        });
      });
  };

  return (
    <Box
      p={3}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        backgroundColor: "transparent",
        padding: "10px",
        border: "1px solid",
      }}
    >
      <TextField
        type="email"
        variant="outlined"
        label="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
        InputLabelProps={{
          style: {
            color: theme.title,
          },
        }}
        InputProps={{
          style: {
            color: theme.title,
          },
        }}
        // border: '1px solid',
      ></TextField>
      <TextField
        type="password"
        variant="outlined"
        label="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
        InputLabelProps={{
          style: {
            color: theme.title,
          },
        }}
        InputProps={{
          style: {
            color: theme.title,
          },
        }}
      ></TextField>
      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: theme.title, color: theme.background }}
        onClick={handleLogin}
      >
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
