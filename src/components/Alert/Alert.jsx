import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const MuiAlert = ({
  snackbarOpen,
  snackbarMessage,
  alertSeverity,
  handleSnackbarClose,
  origin,
}) => {
  return (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={3000}
      onClose={handleSnackbarClose}
      anchorOrigin={
        !origin
          ? { horizontal: 'center', vertical: 'top' }
          : origin
      }
    >
      <Alert onClose={handleSnackbarClose} severity={alertSeverity} sx={{ width: '100%' }}>
        {snackbarMessage}
      </Alert>
    </Snackbar>
  );
};

export default MuiAlert;
