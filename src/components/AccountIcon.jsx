import React, { useState } from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import { Modal, AppBar, Tabs, Tab, Box } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { auth } from "../firebaseConfig";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth"; // it has mulitiple folders
import { useNavigate } from "react-router-dom";
import { useAlert } from "../context/AlertContext";
import GoogleButton from "react-google-button";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useTheme } from "../context/ThemeContext";

// styling using mui
const useStyles = makeStyles(() => ({
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backdropFilter: "blur(2px)", // blurs the modal background
  },
  box: {
    width: 400,
    height: 400, // interface becomes nice
    textAlign: "center",
  },
}));

const AccountIcon = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  const handleValueChange = (e, value) => {
    setValue(value);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();

  // auth.currentUser // through firebase. (both are same)
  const [currUser] = useAuthState(auth); // through react-firebase-hooks
  // 'currUser' contains all the metadata about the user.
  // if no user is signed-in, user value will be null.

  const handleAccountIconClick = () => {
    if (currUser) navigate("/user");
    else setOpen(true);
  };

  const { setAlert } = useAlert();
  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        setAlert({
          open: true,
          type: "success",
          message: "Logged In",
        });
        handleClose();
      })
      .catch((err) => {
        setAlert({
          open: true,
          type: "error",
          message: "Not able to Login with Google",
        });
        handleClose();
      });
  };

  const logout = () => {
    auth
      .signOut()
      .then((ok) => {
        setAlert({
          open: true,
          type: "success",
          message: "Logged out",
        });
        handleClose(); // check
        return;
      })
      .catch((err) => {
        setAlert({
          open: true,
          type: "warning",
          message: "not able to logout",
        });
        handleClose(); // check
        return;
      });
  };

  const { theme } = useTheme();

  return (
    <div>
      <AccountBoxIcon
        onClick={handleAccountIconClick}
        style={{ cursor: "pointer" }}
      />
      {currUser && (
        <LogoutIcon
          onClick={logout}
          style={{ marginLeft: "5px", cursor: "pointer" }}
        />
      )}

      <Modal open={open} onClose={handleClose} className={classes.modal}>
        <div className={classes.box}>
          <AppBar position="static" style={{ backgroundColor: "transparent" }}>
            <Tabs
              value={value}
              onChange={handleValueChange}
              variant="fullWidth"
            >
              {/* if i click on 'login' its value will be 1 and for 'signup' it will be 2 therefore based on these value i open modals */}
              <Tab label="login" style={{ color: theme.title }}></Tab>
              <Tab label="signup" style={{ color: theme.title }}></Tab>
            </Tabs>
          </AppBar>
          {value === 0 && <LoginForm handleClose={handleClose} />}
          {value === 1 && <SignupForm handleClose={handleClose} />}
          <Box className={classes.box}>
            <span style={{ display: "block", padding: "1rem" }}>OR</span>
            <GoogleButton
              style={{ width: "100%" }}
              onClick={signInWithGoogle}
            />
          </Box>
        </div>
      </Modal>
    </div>
  );
};

export default AccountIcon;
