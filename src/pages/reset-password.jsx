import { useState } from 'react';
import Box from '@mui/material/Box';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ControlInput from 'src/components/ControlInput/ControlInput';
import { LoadingButton } from '@mui/lab';
import useFetch from 'src/hooks/use-fetch';
import { useLocation } from 'react-router-dom';
import Alert from 'src/components/Alert/Alert';
import useSnackbar from 'src/hooks/use-snackbar';
import { Typography } from '@mui/material';
import { useRouter } from 'src/routes/hooks';

const defaultResetPassword = {
  password: '',
};

const schema = yup.object().shape({
  password: yup.string().required(),
});

export default function ResetPassword() {
  const [loading, setLoading] = useState(false);

  const { alertSeverity, handleSnackbarClose, snackbarActions, snackbarMessage, snackbarOpen } =
    useSnackbar();

  const { push } = useRouter();

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      ...defaultResetPassword,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await useFetch().postRequest('user/reset-password', {
        email: query.get('email'),
        token: query.get('token'),
        password: data.password,
      });
      setLoading(false);
      snackbarActions('password updated', 'success', true);
      reset()
    } catch (err) {
      setLoading(false);
      snackbarActions(err?.message, 'error', true);
    }
  };

  const handleGoToHomePage = () => {
    push('/landing-page');
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
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}
      >
        <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
          <Typography component={'p'} sx={{ my: '1em' }}>
            Welcome {query.get('email')}
          </Typography>
          <ControlInput
            name={'password'}
            type={'password'}
            control={control}
            fullWidth={true}
            error={errors.password}
            helperText={errors.password ? errors.password.message : ''}
            label={'Password'}
          />

          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: '2em' }}>
            <LoadingButton variant="contained" type="submit" loading={loading} fullWidth>
              New Password
            </LoadingButton>
          </Box>
          <Box>
            <LoadingButton variant="contained" type="button" onClick={handleGoToHomePage} fullWidth>
              Home Page
            </LoadingButton>
          </Box>
        </Box>
      </Box>
    </>
  );
}
