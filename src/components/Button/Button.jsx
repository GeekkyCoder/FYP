import LoadingButton from "@mui/lab/LoadingButton";

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
  return (
    <>
      {type === "button" ? (
        <LoadingButton
        size="large"
          startIcon={icon}
          disabled={disabled}
          type={type}
          variant={"outlined"}
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
          size="large"
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
