import { Box, Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import errorMapping from "../Utils/errorMessages";
import { useAlert } from "../context/AlertContext";
import { useTheme } from "../context/ThemeContext";

const SignupForm = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { theme } = useTheme();

  const { setAlert } = useAlert();

  const handleSignup = () => {
    if (!email || !password || !confirmPassword) {
      setAlert({
        open: true,
        type: "warning",
        message: "Please enter all details",
      });
      return;
    }
    if (password !== confirmPassword) {
      setAlert({
        open: true,
        type: "warning",
        message: "Passwords mismatch",
      });
      return;
    }

    // this one stores user's email and password in firebase when we signup.
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((ok) => {
        setAlert({
          open: true,
          type: "success",
          message: "Account created.",
        });
        handleClose();
      })
      .catch((err) => {
        // console.log(err);
        // alert(errorMapping[err.code] || "some error occurred"); // incase if its value is 'undefined'
        setAlert({
          open: true,
          type: "error",
          message: errorMapping[err.code] || "some error occured",
        });
        handleClose();
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
      <TextField
        type="password"
        variant="outlined"
        label="confirm Password"
        onChange={(e) => setConfirmPassword(e.target.value)}
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
        onClick={handleSignup}
      >
        Signup
      </Button>
    </Box>
  );
};

export default SignupForm;
