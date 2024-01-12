import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from 'src/components/Button/Button';
import Typography from '@mui/material/Typography';

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

const number = {
  fontSize: 24,
  fontFamily: 'default',
  color: 'primary.dark',
  fontWeight: 'medium',
};

const image = {
  height: 55,
  my: 4,
};

function HowItWorks() {
  return (
    <Box component="section" sx={{ display: 'flex', overflow: 'hidden' }}>
      <Container
        sx={{
          mt: 10,
          mb: 15,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component="img"
          src="/assets/background/curlywaves.png"
          alt="curvy lines"
          sx={{
            pointerEvents: 'none',
            position: 'absolute',
            top: -180,
            opacity: 0.7,
          }}
        />
        <Typography variant="h3" marked="center" component="h2" sx={{ mb: 5 }}>
          How it works
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>1.</Box>
                <Box
                  component="img"
                  src="/assets/icons/productHowItWorks1.svg"
                  alt="suitcase"
                  sx={image}
                />
                <Typography variant="h5" align="center" sx={{ fontWeight: 300 }}>
                  Register your phone and provide the necessary details!
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>2.</Box>
                <Box
                  component="img"
                  src="/assets/icons/productHowItWorks2.svg"
                  alt="graph"
                  sx={image}
                />
                <Typography variant="h5" align="center" sx={{ fontWeight: 300 }}>
                  A Map for more accurate information of the phone , where it is lost!!
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>3.</Box>
                <Box
                  component="img"
                  src="/assets/icons/productHowItWorks3.svg"
                  alt="clock"
                  sx={image}
                />
                <Typography variant="h5" align="center" sx={{ fontWeight: 300 }}>
                  Get in touch with someone in our inititive comment section, so you can track your
                  progress
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>
        <Button type={'button'} variant="contained" sx={{ mt: 8 }}>
          Get started
        </Button>
      </Container>
    </Box>
  );
}

export default HowItWorks;
