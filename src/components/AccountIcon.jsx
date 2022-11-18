import React, { useState } from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import { Modal, AppBar, Tabs, Tab } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { auth } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth"; // it has mulitiple folders
import { useNavigate } from "react-router-dom";

// styling using mui
const useStyles = makeStyles(() => ({
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: 400,
    height: 400, // interface becomes nice
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

  const logout = () => {
    auth
      .signOut()
      .then((ok) => {
        alert("Logged out.");
      })
      .catch((err) => {
        alert("not able to logout");
      });
  };

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
              <Tab label="login" style={{ color: "white" }}></Tab>
              <Tab label="signup" style={{ color: "white" }}></Tab>
            </Tabs>
          </AppBar>
          {value === 0 && <LoginForm handleClose={handleClose} />}
          {value === 1 && <SignupForm handleClose={handleClose} />}
        </div>
      </Modal>
    </div>
  );
};

export default AccountIcon;
