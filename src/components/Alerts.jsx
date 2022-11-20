import { Alert, Slide, Snackbar } from "@mui/material";
import React from "react";
import { useAlert } from "../context/AlertContext";

// error message, type of error, open
const Alerts = () => {
  const { alert, setAlert } = useAlert();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      setAlert({
        open: false,
        message: "",
        type: "",
      });
      return;
    }
  };

  return (
    <div>
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Slide in={alert.open}>
          <Alert severity={alert.type} onClose={handleClose}>
            {alert.message}
          </Alert>
        </Slide>
      </Snackbar>
    </div>
  );
};

export default Alerts;
