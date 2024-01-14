import { useState } from 'react';
import Box from '@mui/material/Box';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ModalComp from 'src/components/Modal/Modal';
import ControlInput from 'src/components/ControlInput/ControlInput';
import { EmailRounded } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import useFetch from 'src/hooks/use-fetch';
import useSnackbar from 'src/hooks/use-snackbar';
import Alert from 'src/components/Alert/Alert';

const defaultEmailForm = {
  Email: '',
};

const schema = yup.object().shape({
  Email: yup.string().email().required(),
});

export default function ForgotPassword({ open, handleClose, handleOpen }) {
  const [loading, setLoading] = useState(false);

  const { alertSeverity, handleSnackbarClose, snackbarActions, snackbarMessage, snackbarOpen } =
    useSnackbar();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      ...defaultEmailForm,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const payload = {
      email: data.Email,
    };
    setLoading(true);
    try {
      await useFetch().postRequest('user/forget-password', payload);
      snackbarActions('check your email for reset password link', 'success', true);
      setLoading(false);

      reset();
    } catch (err) {
      snackbarActions(err?.message, 'error', true);
      setLoading(false);
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
      <ModalComp open={open} handleClose={handleClose} handleOpen={handleOpen}>
        <Box component={'form'} onSubmit={handleSubmit(onSubmit)} sx={{ p: '1em' }}>
          <ControlInput
            name={'Email'}
            control={control}
            error={!!errors.Email}
            helperText={errors.Email ? errors.Email?.message : ''}
            fullWidth={true}
            icon={<EmailRounded />}
            type={'email'}
            label={'Email'}
          />

          <Box sx={{ my: '2em', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <LoadingButton
              sx={{ width: '300px' }}
              size="large"
              type={'submit'}
              loading={loading}
              variant={'contained'}
            >
              Submit
            </LoadingButton>
          </Box>
        </Box>
      </ModalComp>
    </>
  );
}
