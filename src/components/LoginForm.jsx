import { Box, Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { auth } from "../firebaseConfig";

const LoginForm = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) return alert("enter all details.");

    // this one allows us to login with existing accounts.
    auth
      .signInWithEmailAndPassword(email, password)
      .then((ok) => {
        alert("Logged in successfully.");
        handleClose();
      })
      .catch((err) => {
        alert("not able to login");
        console.log(err);
      });
  };

  return (
    <Box
      p={3}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        backgroundColor: "white",
        padding: "10px",
      }}
    >
      <TextField
        type="email"
        variant="outlined"
        label="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
      ></TextField>
      <TextField
        type="password"
        variant="outlined"
        label="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
      ></TextField>
      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "red" }}
        onClick={handleLogin}
      >
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
