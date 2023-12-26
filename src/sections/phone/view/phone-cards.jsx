import { useGet } from 'src/hooks/useRequest';
import PhoneCard from './phone-card';
import Spinner from 'src/components/Spinner/Spinner';

function PhoneCards(){
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
      {phonesData &&
        phonesData?.phones?.map((phone) => {
          return <PhoneCard key={phone?._id} phone={phone} />;
        })}
    </>
  );
};

export default PhoneCards;
