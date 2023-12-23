import { useState } from 'react';
import { Box } from '@mui/material';
import { grey, red } from '@mui/material/colors';
import Button from 'src/components/Button/Button';
import MuiCard from 'src/components/Card/Card';
import Typography from 'src/components/Typography/Typography';
import ModalComp from 'src/components/Modal/Modal';
import useModal from 'src/hooks/use-modal';
import PhoneDetails from './phone-details';
import useSnackbar from 'src/hooks/use-snackbar';
import Alert from 'src/components/Alert/Alert';
import MuiDialog from 'src/components/Dialog/Dialog';

export default function PhoneView() {
  const { alertSeverity, handleSnackbarClose, snackbarActions, snackbarMessage, snackbarOpen } =
    useSnackbar();

  const { handleOpen, handleClose, open } = useModal();

  return (
    <>
      <Alert
        alertSeverity={alertSeverity}
        handleSnackbarClose={handleSnackbarClose}
        snackbarMessage={snackbarMessage}
        snackbarOpen={snackbarOpen}
      />
      <>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '200px',
            ':before': {
              position: 'absolute',
              top: '0px',
              content: "''",
              backgroundImage: 'url(/assets/background/mobilebg.jpg)',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              width: '100%',
              height: '100%',
              zIndex: 200,
              backgroundColor: grey['400'],
              backgroundBlendMode: 'multiply',
            },
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 400,
              maxWidth: '80%',
              marginTop: '1em',
            }}
          >
            <Typography
              component={'div'}
              variant={'p'}
              sx={{ fontSize: '2rem', fontWeight: '800', color: '#ffff' }}
            >
              We Got You Covered
            </Typography>
          </Box>
        </Box>

        <MuiCard sx={{ height: 'auto', mt: '1em' }}>
          <Typography
            component={'div'}
            variant={'body2'}
            sx={{ fontSize: '1.5rem', color: red['800'] }}
          >
            Note{' '}
            <Typography component={'div'} variant={'body2'} sx={{ color: grey['800'] }}>
              It is important that you have some information about your phone, we might need some
              info about your phone , so we can help you find it
            </Typography>{' '}
          </Typography>
        </MuiCard>

        <Button
          type={'button'}
          variant={'contained'}
          onClickHandler={handleOpen}
          sx={{ my: '2em', width: '300px' }}
        >
          Add Phone Details
        </Button>

        <MuiDialog
          open={open}
          handleClose={handleClose}
          handleOpen={handleOpen}
          dialogTitle={'Add A Phone'}
          maxWidth={'lg'}
        >
          <PhoneDetails snackbarActions={snackbarActions} />
        </MuiDialog>
      </>
    </>
  );
}
