import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import AppWidgetSummary from '../app-widget-summary';
import useAuth from 'src/hooks/useAuth';
import { useGet } from 'src/hooks/useRequest';

// ----------------------------------------------------------------------

export default function AppView() {
  const { user } = useAuth();

  const {
    data: phoneStat,
    isLoading: phoneStatLoading,
    error: phoneStatError,
  } = useGet('phone/phone-stats', 'phone-stats');

  const {data:totalUser,isLoading:totalUserLoading,error:totalUserError} = useGet("user/total-users",'totalUsers')

  console.log(totalUser)

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome {user?.userName}
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Mobiles Stolen"
            total={!phoneStat?.counts?.stolen ? '0' : phoneStat?.counts?.stolen}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Users Registered"
            total={totalUser?.users}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Mobile Recovered"
            total={phoneStat?.counts?.recovered}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
