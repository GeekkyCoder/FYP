import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const MuiAvatar = ({ children, sx, variant, imageSrc }) => {
  return (
    <>
      {imageSrc ? (
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
        >
          <Avatar
            alt="user-icon"
            sx={{ width: 36, height: 36 }}
            src={
              !imageSrc
                ? 'https://www.pngitem.com/pimgs/m/272-2720656_user-profile-dummy-hd-png-download.png'
                : imageSrc
            }
          />
        </StyledBadge>
      ) : (
        <Avatar sx={sx}>{children}</Avatar>
      )}
    </>
  );
};

export default MuiAvatar;
