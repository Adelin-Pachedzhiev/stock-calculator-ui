import { Snackbar, Alert } from "@mui/material";
import React from "react";

interface ErrorDialogProps {
  message: string | null;
  autoHideDuration?: number;
  onClose: () => void;
}

const ErrorDialog = ({
  message,
  onClose,
  autoHideDuration = 5000,
}: ErrorDialogProps) => {
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    onClose();
  };

  return (
    <Snackbar
      open={!!message}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity="error" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ErrorDialog;
