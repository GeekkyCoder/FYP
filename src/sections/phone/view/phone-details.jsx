import { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import SelectComp from 'src/components/controlSelect/ControlSelect';
import Typography from 'src/components/Typography/Typography';
import ControlInput from 'src/components/ControlInput/ControlInput';
import TextField from '@mui/material/TextField';
import Button from 'src/components/Button/Button';
import { SaveAsRounded } from '@mui/icons-material';
import { usePost } from 'src/hooks/useRequest';
import MapComponent from './Map';
import { InputLabel } from '@mui/material';

const cloudName = 'dczhcauwf';
const preset = 'lfueeeon';

const brands = ['samsung', 'motorolla', 'xiomi', 'iphone', 'realme'];

const defaultPhoneForm = {
  brand: 'samsung',
  model: '',
  imei: '',
  description: '',
};

const phoneSchema = yup.object().shape({
  brand: yup.string().oneOf(['samsung', 'motorolla', 'xiomi', 'iphone', 'realme']).required(),
  model: yup.string().required(),
  imei: yup.string().min(15).max(15).required(),
  description: yup.string().min(30).max(1200).required(),
});

function PhoneDetails({ snackbarActions }) {
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');

  const { mutateAsync, isLoading } = usePost('phone/add/new-entry', ['phonesData']);

  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      ...defaultPhoneForm,
    },
    resolver: yupResolver(phoneSchema),
  });

  const handlFileChange = (e) => {
    const file = e?.target?.files[0];
    setImages((prevImages) => [...prevImages, file]);
  };

  const handleImageSubmit = async () => {
    const containsOtherFormats = images?.some((image) => image?.type === 'application/pdf');

    if (containsOtherFormats) {
      snackbarActions('invalid file format', 'error', true);
      return;
    }

    if (images.length < 1) {
      snackbarActions('please upload at least 1 image', 'info', true);
      return;
    }

    try {
      setLoading(true);
      const uploadedImages = await Promise.all(
        images.map(async (image) => {
          const formData = new FormData();
          formData.append('file', image);
          formData.append('upload_preset', preset);

          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            {
              method: 'POST',
              body: formData,
            }
          );

          return response.json();
        })
      );
      const urls = uploadedImages?.map((image) => image?.secure_url);
      setImageUrls(urls);
      setLoading(false);
      snackbarActions('Images uploaded successfully', 'success', true);
    } catch (err) {
      snackbarActions('image upload failed', 'error', true);
      setLoading(false);
    }
  };

  const handleClearImages = () => {
    const resp = confirm('all images will be removed ?');
    if (resp) {
      setImages([]);
    }
  };

  const onSubmit = async (data) => {
    if (!imageUrls?.length) {
      alert('please provide atleast one picture of your mobile phone');
      return;
    }

    
    if (!address?.length) {
      snackbarActions('address field is required', 'error', true);
      return;
    }

    const payload = {
      ...data,
      address,
      images: imageUrls,
    };

    try {
      await mutateAsync(payload);
      snackbarActions('uploaded', 'success', true);
      reset();
      setImages([]);
      setImageUrls([]);
      setAddress("")
    } catch (err) {
      snackbarActions(err?.message, 'error', true);
    }
  };

  return (
    <>
      <Typography
        component={'div'}
        variant={'p'}
        sx={{ fontSize: '1.5rem', textAlign: 'center', fontWeight: '800' }}
      >
        PHONE DETAILS
      </Typography>
      {/* dialog and map form  start */}
      <Stack direction={'row'} alignItems={'flex-start'} spacing={4}>
        <Box
          onSubmit={handleSubmit(onSubmit)}
          component={'form'}
          autoComplete="on"
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2,1fr)',
            gridAutoRows: 'minmax(90px,auto)',
            columnGap: '10px',
            rowGap: '10px',
            my: '2em',
            width: '100%',
          }}
        >
          <Box>
            <SelectComp control={control} name={'brand'} menuItems={brands} label={'Brand'} />
          </Box>
          <ControlInput
            control={control}
            mulitine={true}
            type={'text'}
            name={'model'}
            helperText={
              touchedFields?.modal && errors?.modal ? errors?.modal?.message : 'e.g Galaxy S9'
            }
            error={touchedFields?.modal && !!errors?.modal}
            fullWidth={true}
          />
          <Box sx={{ gridColumn: '1/-1' }}>
            <ControlInput
              control={control}
              mulitine={true}
              name={'imei'}
              helperText={
                touchedFields?.imei && errors?.imei
                  ? errors?.imei?.message
                  : 'your device 15 digit IMEI Code'
              }
              error={touchedFields?.imei && !!errors?.imei}
              fullWidth={true}
            />
          </Box>
          <Box gridColumn={'1/-1'}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {images?.map((img) => (
                <Box sx={{ ml: '.5em' }}>{img?.name}</Box>
              ))}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <TextField
                sx={{ width: '50%' }}
                accept="image/*"
                size="medium"
                multiple
                type="file"
                mulitine={true}
                onChange={handlFileChange}
              />
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '40%',
                  justifyContent: 'space-between',
                }}
              >
                <Button
                  loading={loading}
                  type={'button'}
                  disabled={!images?.length}
                  variant={'outlined'}
                  onClickHandler={handleImageSubmit}
                  sx={{ width: '45%' }}
                >
                  Upload
                </Button>
                <Button
                  type={'button'}
                  disabled={!images?.length}
                  variant={'outlined'}
                  onClickHandler={handleClearImages}
                  sx={{ width: '45%', display: `${images?.length > 0 ? 'block' : 'none'}` }}
                >
                  Clear
                </Button>
              </Box>
            </Box>
          </Box>
          <Box sx={{ gridColumn: '1/-1' }}>
            <InputLabel shrink>ADDRESS</InputLabel>
            <TextField
              disabled={true}
              value={address}
              required={true}
              fullWidth={true}
              multiline={true}
              placeholder="Address "
            />
          </Box>
          <Box sx={{ gridColumn: '1/-1' }}>
            <ControlInput
              control={control}
              mulitine={true}
              type={'text'}
              name={'description'}
              helperText={
                touchedFields?.description && errors?.description
                  ? errors?.description?.message
                  : ''
              }
              error={touchedFields?.description && !!errors?.description}
              fullWidth={true}
            />
          </Box>
          <Box
            sx={{
              gridColumn: '1/-1',
              my: '1em',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '300px',
              mx: 'auto',
            }}
          >
            <Button
              loading={isLoading}
              type={'submit'}
              icon={<SaveAsRounded />}
              fullWidth={true}
              variant={'contained'}
            >
              Submit
            </Button>
          </Box>
        </Box>
        <MapComponent setAddress={setAddress} />
      </Stack>
      {/* dialog and map form  start */}
    </>
  );
}

export default PhoneDetails;
