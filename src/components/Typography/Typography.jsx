import { Typography as TypographyComp } from '@mui/material';

const Typography = ({ variant, component, sx, children, gutterBottom }) => {
  return (
    <TypographyComp sx={sx} variant={variant} component={component} gutterBottom={gutterBottom}>
      {children}
    </TypographyComp>
  );
};

export default Typography;
