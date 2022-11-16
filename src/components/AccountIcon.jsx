import React, { useState } from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Modal, AppBar, Tabs, Tab } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
// import { makeStyles } from "@mui/styles";
// @material-ui/core

// styling using mui
const useStyles = makeStyles(() => ({
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: 400,
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

  return (
    <div>
      <AccountBoxIcon onClick={() => setOpen(true)} />
      <Modal open={open} onClose={handleClose} className={classes.modal}>
        <div className={classes.box}>
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleValueChange}
              variant="fullWidth"
            >
              {/* if i click on 'login' its value will be 1 and for 'signup' it will be 2 therefore based on these value i open modals */}
              <Tab label="login"></Tab>
              <Tab label="signup"></Tab>
            </Tabs>
          </AppBar>
          {value === 0 && <h1>Login Component</h1>}
          {value === 1 && <h1>Signup Component</h1>}
        </div>
      </Modal>
    </div>
  );
};

export default AccountIcon;
