import { useState } from 'react';
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
import { InputLabel, useMediaQuery } from '@mui/material';
import MarkdownEditor from 'src/components/MarkdownEditor/MarkdownEditor';
import DropZone from 'src/components/DropZone/DropZone';
import useCloudinary from 'src/hooks/use-cloudinary';

const cloudName = 'dczhcauwf';
const preset = 'lfueeeon';

// const brands = ['samsung', 'motorolla', 'xiomi', 'iphone', 'realme'];

const defaultPhoneForm = {
  // brand: 'samsung',
  // model: '',
  imei: '',
};

const phoneSchema = yup.object().shape({
  // brand: yup.string().oneOf(['samsung', 'motorolla', 'xiomi', 'iphone', 'realme']).required(),
  // model: yup.string().required(),
  imei: yup.string().min(15).max(15).required(),
});

function PhoneDetails({ snackbarActions }) {
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState([]);

  const sm = useMediaQuery('(min-width:800px)');

  const { mutateAsync, isLoading } = usePost('phone/add/new-entry', ['phonesData']);

  const { uploadImageToCloudinary } = useCloudinary();

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
    if (images.length < 2) {
      snackbarActions('please provide 2 images of phone box', 'error', true);
      return;
    }

    if (files.length < 2) {
      snackbarActions('please provide front and back of your NIC', 'error', true);
      return;
    }

    let nicPictures = [];

    setLoading(true);

    const url1 = await uploadImageToCloudinary(files[0]?.file);
    const url2 = await uploadImageToCloudinary(files[1]?.file);

    nicPictures.push(url1, url2);

    if (!address?.length) {
      snackbarActions('address field is required', 'error', true);
      return;
    }

    if (!content.length) {
      snackbarActions('please write something about your phone in the editor', 'error', true);
    }

    const payload = {
      ...data,
      address,
      content,
      nicPictures,
      images: imageUrls,
    };

    try {
      await mutateAsync(payload);
      snackbarActions('your post will be verified by admin, please wait...', 'success', true);
      reset();
      setImages([]);
      setImageUrls([]);
      setAddress('');
      setContent('');
      setFiles([]);
      setLoading(false);
    } catch (err) {
      snackbarActions(err?.message, 'error', true);
      setLoading(false);
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
      <Stack direction={`${sm ? 'row' : 'column'}`} alignItems={'flex-start'} spacing={4}>
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
          <Box sx={{ gridColumn: '1/-1' }}>
            <Typography component={'div'} variant={'body2'} sx={{ fontWeight: 'bold' }}>
              Upload Front And Back Of NIC
            </Typography>
            <DropZone files={files} setFiles={setFiles} />
          </Box>

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
            {images?.length === 1 && (
              <Typography component={'div'} sx={{ my: '.7em' }}>
                Upload At Least Two Images
              </Typography>
            )}
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
                  flexDirection: `${sm ? 'row' : 'column'}`,
                  width: '40%',
                  justifyContent: 'space-between',
                }}
              >
                <Button
                  loading={loading}
                  type={'button'}
                  disabled={images?.length < 2}
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
                  sx={{
                    width: '45%',
                    display: `${images?.length > 0 ? 'block' : 'none'}`,
                    my: `${sm ? '0em' : '.5em'}`,
                  }}
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
          <Box sx={{ gridColumn: '1/-1', mb: '2em' }}>
            <MarkdownEditor content={content} setContent={setContent} />
          </Box>
          <Box
            sx={{
              gridColumn: '1/-1',
              my: '1em',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: `${sm && '300px'}`,
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
