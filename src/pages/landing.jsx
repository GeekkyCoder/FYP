import { Helmet } from 'react-helmet-async';

import { LandingPageView } from 'src/sections/landing-page';

// ----------------------------------------------------------------------

export default function LandingPage() {
  return (
    <>
      <Helmet>
        <title> Phone-Tracker -Home </title>
      </Helmet>

      <LandingPageView />
    </>
  );
}
