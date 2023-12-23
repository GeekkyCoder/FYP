import { Helmet } from 'react-helmet-async';
import { PhoneView } from 'src/sections/phone/view';

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Phone </title>
      </Helmet>

      <PhoneView />
    </>
  );
}
