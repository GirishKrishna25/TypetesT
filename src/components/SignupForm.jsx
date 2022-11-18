import { Box, Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { auth } from "../firebaseConfig";

const SignupForm = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = () => {
    if (!email || !password || !confirmPassword)
      return alert("enter all details");
    if (password !== confirmPassword) return alert("passwords mismatched");

    // this one stores user's email and password in firebase when we signup.
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((ok) => {
        alert("user created");
        handleClose();
      })
      .catch((err) => {
        alert("not able to create user account");
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
      <TextField
        type="password"
        variant="outlined"
        label="confirm Password"
        onChange={(e) => setConfirmPassword(e.target.value)}
      ></TextField>
      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "red" }}
        onClick={handleSignup}
      >
        Signup
      </Button>
    </Box>
  );
};

export default SignupForm;
