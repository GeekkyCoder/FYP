import Box from '@mui/material/Box';
import Typewriter from 'typewriter-effect';
import heroBg from '/assets/background/hero-bg.png';
import Typography from 'src/components/Typography/Typography';
import Button from 'src/components/Button/Button';
import { useNavigate } from 'react-router-dom';

export default function Hero() {

  const navigate = useNavigate()

const handleSignInClick = () => {
  navigate("/login")
}

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '500px',
        ':before': {
          position: 'absolute',
          content: "''",
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -200,
          top: -20,
          left: 0,
          width: '100%',
          height: '400px',
        },
      }}
    >
      <Typography
        component={'h3'}
        variant={'h3'}
        sx={{ textAlign: 'center', pt: '4em', color: 'white' }}
      >
        We Help You Locate Your Phone
        <Typewriter
          options={{
            strings: ['Within no timeframe', 'its all for free'],
            autoStart: true,
            loop: true,
            delay: 75,
            deleteSpeed: 0.5,
          }}
        />
      </Typography>
      <Box sx={{ mx: 'auto', width: '150px', textAlign: 'center', mt: '2em' }}>
        <Button
          type={'button'}
          onClickHandler={handleSignInClick}
          variant={'contained'}
          sx={{ width: '100%', background: (theme) => theme?.pallete?.primary?.main }}
        >
          Sign In
        </Button>
      </Box>
    </Box>
  );
}
