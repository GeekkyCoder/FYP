import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

function AboutUs() {
  return (
    <Box component="section" sx={{ display: 'flex', overflow: 'hidden' }}>
      <Container sx={{ mb: 12, display: 'flex', position: 'relative' }}>
        <Box
          component="img"
          src="/assets/background/curlywaves.png"
          alt="curvy lines"
          sx={{ pointerEvents: 'none', position: 'absolute', top: -180 }}
        />
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src="/assets/icons/about1.svg"
                alt="suitcase"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                Find Your Phones 🗺
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 300 }}>
                {'Search for phones location with no timeframe'}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box component="img" src="/assets/icons/about2.svg" alt="graph" sx={{ height: 55 }} />
              <Typography variant="h6" sx={{ my: 5 }}>
                Maps and Intitive UI
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 300 }}>
                {'We have built the site in such a way that is user-frienldy and easy to navigate '}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box component="img" src="/assets/icons/about3.svg" alt="clock" sx={{ height: 55 }} />
              <Typography variant="h6" sx={{ my: 5 }}>
                No Credit Card
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 300 }}>
                {'Its completely free service, used by individuals, '}
                {'that you will not find anywhere else.'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default AboutUs;
