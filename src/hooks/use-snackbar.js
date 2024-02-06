import { useState } from 'react';

const useSnackbar = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  //'error' | 'info' | 'success' | 'warning'
  const [alertSeverity, setAlertSeverity] = useState('success');

  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  //takes a string message
  const handleSnackbarMesage = (msg) => {
    setSnackbarMessage(msg);
  };

  const handleAlertSeverity = (severity) => {
    setAlertSeverity(severity);
  };

  const snackbarActions = (message, severity, open) => {
    handleSnackbarOpen(open);
    handleSnackbarMesage(message);
    handleAlertSeverity(severity);
    setTimeout(() => {
      handleSnackbarClose();
    }, 10000);
  };

  return {
    snackbarMessage,
    snackbarOpen,
    alertSeverity,
    snackbarActions,
    handleSnackbarClose,
  };
};

export default useSnackbar;
