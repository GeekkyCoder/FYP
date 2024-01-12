import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { alpha, useTheme } from '@mui/material/styles';
import ControlInput from 'src/components/ControlInput/ControlInput';
import Typography from 'src/components/Typography/Typography';
import Button from 'src/components/Button/Button';
import useAuth from 'src/hooks/useAuth';
import TextField from '@mui/material/TextField';
import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useFetch from 'src/hooks/use-fetch';
import useCloudinary from 'src/hooks/use-cloudinary';
import useSnackbar from 'src/hooks/use-snackbar';
import Alert from 'src/components/Alert/Alert';
// import { SignupView } from '../signup/signup-view';

// ----------------------------------------------------------------------

const defaultLoginFormData = {
  Email: '',
  Password: '',
};

const schema = yup.object().shape({
  Email: yup.string().email().required(),
  Password: yup.string().required(),
});

const schemaSignUp = yup.object().shape({
  UserName: yup
    .string()
    .required()
    .min(2)
    .max(30)
    .matches(
      /^[a-zA-Z]+(\s*[a-zA-Z0-9]*)*$/,
      'should start with digit and can not include special symbols'
    ),
  Email: yup.string().email().required(),
  Password: yup.string().required(),
  ConfirmPassword: yup
    .string()
    .oneOf([yup.ref('Password'), null], 'Passwords must match')
    .required(),
});

const defaultSignupFormData = {
  UserName: '',
  Email: '',
  Password: '',
  ConfirmPassword: '',
};

export default function LoginView() {
  const [image, setImage] = useState(null);
  const [page, setPage] = useState('login');
  const { postRequest } = useFetch();
  const { uploadImageToCloudinary } = useCloudinary();
  const [isloading, setIsLoading] = useState(false);

  const { setUser } = useAuth();
  const { alertSeverity, handleSnackbarClose, snackbarActions, snackbarMessage, snackbarOpen } =
    useSnackbar();

  const {
    control: loginControl,
    handleSubmit: loginSubmit,
    formState: { errors: loginErrors },
    reset: loginReset,
  } = useForm({
    defaultValues: {
      ...defaultLoginFormData,
    },
    resolver: yupResolver(schema),
  });

  const {
    control: signupControl,
    handleSubmit: signupSubmit,
    formState: { errors: signupErrors },
    reset: signupReset,
  } = useForm({
    defaultValues: {
      ...defaultSignupFormData,
    },
    resolver: yupResolver(schemaSignUp),
  });

  const theme = useTheme();

  const router = useRouter();

  const handleLogin = async (data) => {
    const payload = {
      email: data.Email,
      password: data.Password,
    };
    try {
      const { user } = await postRequest('user/auth/login', payload);
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      router.push('/');
      loginReset();
      snackbarActions('logged in successfully', 'success', true);
    } catch (err) {
      console.log(err);
      snackbarActions(err?.message, 'error', true);
      console.log(err);
    }
  };

  const handleSignUp = async (data) => {
    setIsLoading(true);
    const imageUrl = await uploadImageToCloudinary(image);

    const payload = {
      userName: data.UserName,
      email: data?.Email,
      password: data?.Password,
      confirmPassword: data?.ConfirmPassword,
      profilePicture: imageUrl,
    };

    try {
      await postRequest('user/auth/register', payload);
      signupReset();
      setIsLoading(false);
      snackbarActions('registered successfully', 'success', true);
    } catch (err) {
      snackbarActions(err?.message, 'error', true);
      setIsLoading(false);
      console.log(err);
    }
  };

  const togglePage = (page) => {
    setPage(page);
  };

  const navigateToHome = () => {
    router.push('/landing-page');
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    if (e?.target?.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const RenderLoginForm = ({ control, errors, submitHandler, handleLogin }) => (
    <Box component={'form'} onSubmit={submitHandler(handleLogin)}>
      <Stack spacing={3}>
        <ControlInput
          name="Email"
          label="Email address"
          control={control}
          error={!!errors?.Email}
          helperText={errors?.Email ? errors?.Email.message : ''}
          type={'email'}
          fullWidth={true}
          icon={'ic:baseline-email'}
        />

        <ControlInput
          control={control}
          error={!!errors?.Password}
          fullWidth={true}
          helperText={errors?.Password ? errors?.Password?.message : ''}
          label={'Password'}
          name={'Password'}
          type={'password'}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <Button type="submit" fullWidth={true} variant="contained">
        Login
      </Button>
    </Box>
  );

  const RenderSignUpForm = ({
    control,
    errors,
    submitHandler,
    handleImageChange,
    handleSignUp,
    isloading,
  }) => {
    return (
      <Box component={'form'} onSubmit={submitHandler(handleSignUp)}>
        <Stack spacing={3} mb={'1em'}>
          <ControlInput
            name="UserName"
            label="Name"
            icon={'mdi:account-circle'}
            control={control}
            error={!!errors?.UserName}
            helperText={errors?.UserName ? errors?.UserName.message : ''}
            type={'text'}
            fullWidth={true}
          />

          <ControlInput
            name="Email"
            label="Email address"
            control={control}
            error={!!errors?.Email}
            helperText={errors?.Email ? errors?.Email.message : ''}
            type={'email'}
            fullWidth={true}
            icon={'ic:baseline-email'}
          />

          <ControlInput
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
        </Stack>

        <Button loading={isloading} type="submit" fullWidth={true} variant="contained">
          Signup
        </Button>
      </Box>
    );
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
          ...bgGradient({
            color: alpha(theme.palette.background.default, 0.9),
            imgUrl: '/assets/background/overlay_4.jpg',
          }),
          // height: 1,
        }}
      >
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, md: 24 },
            left: { xs: 16, md: 24 },
          }}
        />

        <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
          <Card
            sx={{
              p: 5,
              width: 1,
              maxWidth: 420,
            }}
          >
            <Typography variant="h4">{page === 'login' ? 'Signin' : 'Signup'}</Typography>

            <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
              {page === 'login' ? 'Don’t have an account?' : 'have an account ?'}
              {page === 'login' ? (
                <>
                  <Link onClick={() => togglePage('signup')} variant="subtitle2" sx={{ ml: 0.5 }}>
                    Sign up
                  </Link>

                  <Link onClick={navigateToHome} variant="subtitle2" sx={{ ml: '1em' }}>
                    Home
                  </Link>
                </>
              ) : (
                <>
                  <Link onClick={() => togglePage('login')} variant="subtitle2" sx={{ ml: 0.5 }}>
                    Log in
                  </Link>
                  <Link onClick={navigateToHome} variant="subtitle2" sx={{ ml: '1em' }}>
                    Home
                  </Link>
                </>
              )}
            </Typography>

            <Stack direction="row" spacing={2}>
              <Button
                type={'button'}
                fullWidth={true}
                variant="outlined"
                sx={{ borderColor: alpha(theme.palette.grey[500], 0.16), color: 'inherit' }}
              >
                <Iconify icon="eva:google-fill" color="#DF3E30" />
              </Button>

              <Button
                type={'button'}
                fullWidth={true}
                variant="outlined"
                sx={{ borderColor: alpha(theme.palette.grey[500], 0.16), color: 'inherit' }}
              >
                <Iconify icon="eva:facebook-fill" color="#1877F2" />
              </Button>

              <Button
                fullWidth={true}
                variant="outlined"
                type={'button'}
                sx={{ borderColor: alpha(theme.palette.grey[500], 0.16), color: 'inherit' }}
              >
                <Iconify icon="eva:twitter-fill" color="#1C9CEA" />
              </Button>
            </Stack>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider>

            {page === 'login' && (
              <RenderLoginForm
                control={loginControl}
                errors={loginErrors}
                submitHandler={loginSubmit}
                handleLogin={handleLogin}
              />
            )}
            {page === 'signup' && (
              <RenderSignUpForm
                control={signupControl}
                errors={signupErrors}
                submitHandler={signupSubmit}
                handleImageChange={handleImageChange}
                handleSignUp={handleSignUp}
                isloading={isloading}
              />
            )}
          </Card>
        </Stack>
      </Box>
    </>
  );
}
