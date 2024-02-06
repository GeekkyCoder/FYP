import LoadingButton from '@mui/lab/LoadingButton';
import { useMediaQuery } from '@mui/material';

const Button = ({
  type,
  variant,
  children,
  onClickHandler,
  fullWidth,
  sx,
  disabled,
  ref,
  loading,
  icon,
}) => {
  const sm = useMediaQuery('(min-width:800px)');

  return (
    <>
      {type === 'button' ? (
        <LoadingButton
          size={`${sm} ? "large" : "small"`}
          startIcon={icon}
          disabled={disabled}
          type={type}
          variant={variant}
          onClick={onClickHandler}
          fullWidth={fullWidth}
          ref={ref}
          sx={sx}
          loading={loading}
        >
          {children}
        </LoadingButton>
      ) : (
        <LoadingButton
          size={`${sm} ? "large" : "small"`}
          startIcon={icon}
          type={type}
          variant={variant}
          fullWidth={fullWidth}
          color="inherit"
          disabled={disabled}
          loading={loading}
        >
          {children}
        </LoadingButton>
      )}
    </>
  );
};

export default Button;
