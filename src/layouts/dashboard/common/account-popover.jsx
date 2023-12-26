import { useState } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

// import { account } from 'src/_mock/account';
import useAuth from 'src/hooks/useAuth';
import useFetch from 'src/hooks/use-fetch';
import MuiDialog from 'src/components/Dialog/Dialog';
import useDialog from 'src/hooks/use-dialog';
import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ControlInput from 'src/components/ControlInput/ControlInput';
import Button from 'src/components/Button/Button';
import Spinner from 'src/components/Spinner/Spinner';
import Alert from 'src/components/Alert/Alert';
import { CloseOutlined } from '@mui/icons-material';
import useCloudinary from 'src/hooks/use-cloudinary';
import useSnackbar from 'src/hooks/use-snackbar';
import { useRouter } from 'src/routes/hooks';
const defaultUpdateUserForm = {
  UserName: '',
};

const updateUserSchema = yup.object().shape({
  UserName: yup
    .string()
    .min(2)
    .max(30)
    .matches(
      /^[a-zA-Z]+(\s*[a-zA-Z0-9]*)*$/,
      'should start with digit and can not include special symbols'
    ),
});

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
  },
  {
    label: 'Profile',
    icon: 'eva:person-fill',
  },
  {
    label: 'Settings',
    icon: 'eva:settings-2-fill',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { alertSeverity, handleSnackbarClose, snackbarActions, snackbarMessage, snackbarOpen } =
    useSnackbar();
  const { uploadImageToCloudinary } = useCloudinary();
  const { push } = useRouter();

  const {
    control: updateControl,
    handleSubmit: updateSubmit,
    formState: { errors: updateErrors },
    reset: updateReset,
  } = useForm({
    defaultValues: {
      ...defaultUpdateUserForm,
    },
    resolver: yupResolver(updateUserSchema),
  });

  const { user, setUser } = useAuth();
  const { deleteRequest } = useFetch();
  const {
    handleClose: handleDialogClose,
    handleOpen: handleDialogOpen,
    open: dialogOpen,
  } = useDialog();

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleImageChange = (e) => {
    if (e?.target?.files) {
      setImage(e.target?.files[0]);
    }
  };

  const handleLogOut = async () => {
    try {
      await deleteRequest('auth/log-out');
      localStorage.clear();
      setUser(null);
      handleClose();
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleProfileClick = () => {
    handleDialogOpen();
    handleClose();
  };

  const handleUpdateSubmit = async (data) => {
    //image upload to cloudinary
    setIsLoading(true);
    const image_url = await uploadImageToCloudinary(image);

    const payload = {
      userName: data.UserName,
      profilePicture: image_url,
    };

    try {
      const updatedUser = await useFetch().putRequest('user/update-user', payload);
      localStorage.setItem('user', JSON.stringify(updatedUser?.user));
      setUser(updatedUser?.user);
      snackbarActions('information updated', 'success', true);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      snackbarActions(err?.message, 'error', true);
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
      <MuiDialog
        handleClose={handleDialogClose}
        handleOpen={handleDialogOpen}
        open={dialogOpen}
        maxWidth={'lg'}
        fullScreen={true}
      >
        <Box
          sx={{
            position: 'relative',
            ':before': {
              content: "''",
              position: 'absolute',
              top: 0,
              left: 0,
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed',
              backgroundSize: 'cover',
              width: '100%',
              height: '150px',
              clipPath: 'polygon(0 0, 100% 0,100% 80%, 50% 100%, 0 80%)',
              zIndex: 50,
              background: `linear-gradient(to right, rgba(119, 6, 96, 0.6),rgba(51,51,153,0.6)), url(/assets/background/profilebg.jpg)`,
            },
          }}
        >
          <Typography
            component={'div'}
            variant="body2"
            sx={{
              display: 'block',
              position: 'absolute',
              top: '50%',
              left: '50%',
              zIndex: 100,
              color: '#fff',
              textAlign: 'center',
              transform: 'translate(-50%,200%)',
              fontSize: { sm: '1rem', md: '1.5rem' },
              fontWeight: 800,
              textShadow: '0 0 10px rgba(0,0,0,0.5)',
            }}
          >
            Update Your Profile {user?.userName}
          </Typography>
        </Box>

        {user ? (
          <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <Box sx={{ width: { sm: '100%', md: '50%' }, ml: '1em', mt: '10em' }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <CloseOutlined fontSize="large" onClick={handleDialogClose} />
              </Box>
              <Stack direction={'row'} spacing={2} alignItems={'center'}>
                <Avatar variant="circular" src={user?.profilePicture} alt={user?.userName}></Avatar>
                <Typography
                  component={'div'}
                  variant="body2"
                  mt={'2em'}
                  sx={{ fontSize: '1.2rem' }}
                >
                  {user?.userName}
                </Typography>
              </Stack>

              <Logo sx={{ position: 'absolute', top: 12, right: 20, zIndex: 200 }} />

              <Box>
                <Box component={'form'} onSubmit={updateSubmit(handleUpdateSubmit)}>
                  <Stack spacing={3} mb={'1em'} mt={'2em'}>
                    <ControlInput
                      name="UserName"
                      label={user?.userName}
                      icon={'mdi:account-circle'}
                      control={updateControl}
                      error={!!updateErrors?.UserName}
                      helperText={updateErrors?.UserName ? updateErrors?.UserName.message : ''}
                      type={'text'}
                      fullWidth={true}
                    />

                    <Stack direction={'column'}>
                      <Typography component={'div'} variant={'p'}>
                        Profile picture
                      </Typography>
                      {image && (
                        <Typography component={'span'} variant={'p'}>
                          {image?.name}
                        </Typography>
                      )}
                      <TextField accept="image/*" type="file" onChange={handleImageChange} />
                    </Stack>

                    {/* <ControlInput
            control={control}
            error={!!errors?.Password}
            fullWidth={true}
            helperText={errors?.Password ? errors?.Password?.message : ''}
            label={'Password'}
            name={'Password'}
            type={'password'}
          />

          <ControlInput
            control={control}
            error={!!errors?.ConfirmPassword}
            fullWidth={true}
            helperText={errors?.ConfirmPassword ? errors?.ConfirmPassword?.message : ''}
            label={'ConfirmPassword'}
            name={'ConfirmPassword'}
            type={'password'}
          /> */}

                    {/* <Stack direction={'column'}>
            <Typography component={'div'} variant={'p'}>
              Profile picture
            </Typography>
          {image &&  <Typography component={'span'} variant={'p'}>{image?.name}</Typography>}
            <TextField accept="image/*" type="file" onChange={handleImageChange} />
          </Stack> */}
                  </Stack>

                  <Button type="submit" fullWidth={true} variant="contained">
                    Submit
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        ) : (
          <Spinner />
        )}
      </MuiDialog>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={user?.profilePicture}
          alt={user?.userName}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {user?.userName.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.userName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {/* {MENU_OPTIONS.map((option) => (
          <MenuItem key={option.label} onClick={handleClose}>
            {option.label}
          </MenuItem>
        ))} */}
        <MenuItem>Home</MenuItem>

        <MenuItem onClick={handleProfileClick}>Profile</MenuItem>

        <Divider sx={{ borderStyle: 'dashed', m: 0 }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={handleLogOut}
          sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
        >
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
