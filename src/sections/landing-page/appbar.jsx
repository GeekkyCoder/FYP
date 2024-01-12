import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function Appbar(props) {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    navigate('/');
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar sx={{ bgcolor: theme?.palette?.primary?.dark }}>
          <Toolbar>
            <Typography variant="h6" component="div">
              Phone Tracker
            </Typography>

            <Button
              onClick={handleDashboardClick}
              variant="outlined"
              sx={{ color: 'white', ml: 'auto' }}
            >
              Dashboard
            </Button>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </React.Fragment>
  );
}
