import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
// import Button from 'src/components/Button/Button';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import ControlInput from 'src/components/ControlInput/ControlInput';
import { EmailOutlined, MessageOutlined } from '@mui/icons-material';
import useFetch from 'src/hooks/use-fetch';
import Alert from 'src/components/Alert/Alert';
import useSnackbar from 'src/hooks/use-snackbar';

const defaultCTAForm = {
  Email: '',
  Message: '',
};

const schema = yup.object().shape({
  Email: yup.string().email().required(),
  Message: yup.string().required(),
});

function ProductCTA() {
  const [open, setOpen] = React.useState(false);

  const { alertSeverity, handleSnackbarClose, snackbarActions, snackbarMessage, snackbarOpen } =
    useSnackbar();

  const handleSubmit = (event) => {
    event.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {
    control,
    handleSubmit: handleCTOSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      ...defaultCTAForm,
    },
    resolver: yupResolver(schema),
  });

  const handleFeedbackSubmit = async (data) => {
    try {
      await useFetch().postRequest('user/feedback', { Email: data.Email, Message: data.Message });
      snackbarActions('thank you for your feedback', 'success', true);
      reset()
    } catch (err) {
      snackbarActions('failed to give feedback', 'error', true);
    }
  };

  return (
    <>
      <Alert
        snackbarMessage={snackbarMessage}
        snackbarOpen={snackbarOpen}
        handleSnackbarClose={handleSnackbarClose}
        alertSeverity={alertSeverity}
      />
      <Container component="section" sx={{ my: 10, display: 'flex' }}>
        <Grid container>
          <Grid item xs={12} md={6} sx={{ zIndex: 1 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                bgcolor: 'primary.dark',
                py: 8,
                px: 3,
              }}
            >
              <Box
                component="form"
                onSubmit={handleCTOSubmit(handleFeedbackSubmit)}
                sx={{ maxWidth: 400 }}
              >
                <Typography variant="h2" component="h2" gutterBottom color={'white'}>
                  Contact us
                </Typography>
                <Typography variant="h5" color={'white'}>
                  Your feedback will be much appreciated, 😄
                </Typography>

                <Box sx={{ my: '1em' }}>
                  <ControlInput
                    control={control}
                    fullWidth={true}
                    name={'Email'}
                    type={'email'}
                    error={!!errors.Email}
                    helperText={errors.Email ? errors.Email.message : ''}
                    label={'Email'}
                    icon={<EmailOutlined />}
                    sx={{ bgcolor: 'white' }}
                  />
                </Box>
                <Box sx={{ my: '1em' }}>
                  <ControlInput
                    control={control}
                    fullWidth={true}
                    mulitine={true}
                    name={'Message'}
                    type={'text'}
                    error={!!errors.Message}
                    helperText={errors.Message ? errors.Message.message : ''}
                    label={'Messsage'}
                    sx={{ bgcolor: 'white' }}
                    icon={<MessageOutlined />}
                  />
                </Box>

                <Button
                  type="submit"
                  // color="primary"
                  size="large"
                  variant="contained"
                  sx={{
                    width: '100%',
                    bgcolor: 'whitesmoke',
                    color: 'black',
                    ':hover': { bgcolor: 'whitesmoke', color: 'black' },
                  }}
                >
                  Send
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ display: { md: 'block', xs: 'none' }, position: 'relative' }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: -67,
                left: -67,
                right: 0,
                bottom: 0,
                width: '100%',
                background: 'url(/assets/background/productCTAImageDots.png)',
              }}
            />
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1512149673953-1e251807ec7c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="call to action"
              sx={{
                position: 'absolute',
                top: -28,
                left: -28,
                right: 0,
                bottom: 0,
                width: '100%',
                maxWidth: 600,
              }}
            />
          </Grid>
        </Grid>
        <Snackbar
          open={open}
          closeFunc={handleClose}
          message="We will send you our best offers, once a week."
        />
      </Container>
    </>
  );
}

export default ProductCTA;
