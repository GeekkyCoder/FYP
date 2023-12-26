import { useGet } from 'src/hooks/useRequest';
import PhoneCard from './phone-card';
import Spinner from 'src/components/Spinner/Spinner';
import Typography from 'src/components/Typography/Typography';

function PhoneCards() {
  const {
    data: phonesData,
    isLoading: phonesloading,
    error: phonesError,
  } = useGet('phone/getallphones', 'phonesData');

  if (phonesError) {
    return <div>Could not fetch phones...</div>;
  }

  if (phonesloading) {
    return (
      <>
        {' '}
        <Spinner />{' '}
      </>
    );
  }

  return (
    <>
      {phonesData && phonesData?.phones?.length > 0 ? (
        phonesData?.phones?.map((phone) => {
          return <PhoneCard key={phone?._id} phone={phone} />;
        })
      ) : (
        <Typography component={'div'} variant={'h3'}>
          No Phones Registered Yet So Far
        </Typography>
      )}
    </>
  );
}

export default PhoneCards;
