import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { green, red } from '@mui/material/colors';
import { Link, useLocation } from 'react-router-dom';
import useFetch from 'src/hooks/use-fetch';
import Alert from 'src/components/Alert/Alert';
import useSnackbar from 'src/hooks/use-snackbar';

export default function VerifyEmail() {
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const { alertSeverity, handleSnackbarClose, snackbarActions, snackbarMessage, snackbarOpen } =
    useSnackbar();

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();

  const verifyToken = async () => {
    setLoading(true);
    try {
      await useFetch().postRequest('user/auth/verify-email', {
        email: query.get('email'),
      });
      setLoading(false);
      setIsVerified(true);
      snackbarActions('account verified', 'success', true);
    } catch (error) {
      setLoading(false);
      setIsVerified(false);
      snackbarActions(error?.message, 'error', true);
    }
  };

  return (
    <>
      <Alert
        alertSeverity={alertSeverity}
        handleSnackbarClose={handleSnackbarClose}
        snackbarMessage={snackbarMessage}
        snackbarOpen={snackbarOpen}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        {!isVerified && (
          <>
            <Typography variant="p" sx={{ my: '1em' }}>
              Hello {query.get('email')}
            </Typography>
            <Typography component={'p'}>Verify Your Account</Typography>
          </>
        )}
        {isVerified && (
          <Typography variant="subtitle2" sx={{ my: '1em', color: green['700'] }}>
            Account Verified
          </Typography>
        )}

        <LoadingButton
          sx={{ width: '300px', mt: '1em' }}
          loading={loading}
          onClick={verifyToken}
          variant={'contained'}
          size="large"
        >
          Verify Email
        </LoadingButton>
      </Box>
    </>
  );
}
