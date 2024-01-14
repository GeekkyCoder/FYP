import { useState } from 'react';
import {
  Box,
  Stack,
  styled,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import { blueGrey, grey, red } from '@mui/material/colors';
import Button from 'src/components/Button/Button';
import MuiCard from 'src/components/Card/Card';
import Typography from 'src/components/Typography/Typography';
import useModal from 'src/hooks/use-modal';
import PhoneDetails from './phone-details';
import useSnackbar from 'src/hooks/use-snackbar';
import Alert from 'src/components/Alert/Alert';
import MuiDialog from 'src/components/Dialog/Dialog';
import PhoneCards from './phone-cards';
import ControlInput from 'src/components/ControlInput/ControlInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useDialog from 'src/hooks/use-dialog';
import {
  QueryStatsOutlined,
  ExpandMoreOutlined,
  Share,
  Favorite,
  MoreVert,
  ArrowLeft,
} from '@mui/icons-material';
import useFetch from 'src/hooks/use-fetch';
import Avatar from 'src/components/Avatar/Avatar';
import { localeDate } from 'src/utils/locale-date';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const defaultStatusSchema = {
  imei: '',
};

const statusSchema = yup.object().shape({
  imei: yup.string().min(15).max(15).required(),
});

function StatusCard({ statusPhone }) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      {statusPhone ? (
        <Card sx={{ maxWidth: 345 }}>
          <CardHeader
            avatar={<Avatar imageSrc={statusPhone?.phone?.owner?.profilePicture} />}
            action={
              <IconButton aria-label="settings">
                <MoreVert />
              </IconButton>
            }
            title={statusPhone?.phone?.model}
            subheader={localeDate(statusPhone?.phone?.createdAt)}
          />
        {statusPhone?.phone?.images[0] &&  <CardMedia
            component="img"
            height="194"
            image={statusPhone?.phone?.images[0]}
            alt="Paella dish"
          />}
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {statusPhone?.phone?.description}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreOutlined />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItens: 'center',
                  flexDirection: 'column',
                  my: '1em',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography
                    component={'div'}
                    variant={'body2'}
                    sx={{ fontSize: '.9rem', color: blueGrey['A700'] }}
                  >
                    Posted By:
                  </Typography>
                  <Typography
                    component={'div'}
                    variant={'body2'}
                    sx={{ fontSize: '.9rem', color: blueGrey['A700'], ml: '.7em' }}
                  >
                    {statusPhone?.phone?.owner?.name}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      bgcolor: `${statusPhone?.phone?.status === 'recovered' ? 'green' : 'red'}`,
                    }}
                  ></Box>
                  <Typography
                    component={'div'}
                    variant={'body2'}
                    sx={{ ml: '.5em', fontSize: '.9rem', color: blueGrey['A700'] }}
                  >
                    {statusPhone?.phone?.status}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography
                    component={'div'}
                    variant={'body2'}
                    sx={{ fontSize: '.9rem', color: blueGrey['A700'] }}
                  >
                    Brand:
                  </Typography>

                  <Typography
                    component={'div'}
                    variant={'p'}
                    sx={{ ml: '.5em', fontSize: '.7rem', color: blueGrey['A700'] }}
                  >
                    {statusPhone?.phone?.brand}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography
                    component={'div'}
                    variant={'body2'}
                    sx={{ fontSize: '.9rem', color: blueGrey['A700'] }}
                  >
                    Model:
                  </Typography>

                  <Typography
                    component={'div'}
                    variant={'p'}
                    sx={{ ml: '.5em', fontSize: '.7rem', color: blueGrey['A700'] }}
                  >
                    {statusPhone?.phone?.model}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography
                    component={'div'}
                    variant={'body2'}
                    sx={{ fontSize: '.9rem', color: blueGrey['A700'] }}
                  >
                    Address:
                  </Typography>

                  <Typography
                    component={'div'}
                    variant={'p'}
                    sx={{ ml: '.5em', fontSize: '.7rem', color: blueGrey['A700'] }}
                  >
                    {statusPhone?.phone?.address}
                  </Typography>
                </Box>
                <Box>
                  <>
                    {statusPhone?.phone?.images?.map((img, idx) => (
                      <div key={idx} style={{ margin: '1em 0' }}>
                        <img src={img} alt="phone-image" />
                      </div>
                    ))}
                  </>
                </Box>
              </Box>
            </CardContent>
          </Collapse>
        </Card>
      ) : (
        <Typography component={'div'} variant={'h5'}>
          this phone is not registered or might be invalid IMEI
        </Typography>
      )}
    </>
  );
}

function StatusModel({
  open,
  handleOpen,
  handleClose,
  snackbarActions,
  setStatusPhone,
  statusPhone,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
  } = useForm({
    defaultValues: {
      ...defaultStatusSchema,
    },
    resolver: yupResolver(statusSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const phoneStatusData = await useFetch().postRequest('phone/showphonestatus', data);
      reset();
      setIsLoading(false);
      setStatusPhone(phoneStatusData);
      snackbarActions(`success`, 'success', true);
    } catch (err) {
      setIsLoading(false);
      snackbarActions(err?.message, 'error', true);
    }
  };

  const handleGoBack = () => {
    setStatusPhone(null);
  };

  return (
    <>
      <MuiDialog
        open={open}
        handleClose={handleClose}
        handleOpen={handleOpen}
        maxWidth={'xs'}
        dialogTitle={statusPhone ? statusPhone?.phone?.model : 'Check Status For Phone'}
      >
        {!statusPhone ? (
          <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ my: '2em' }}>
              <ControlInput
                control={control}
                helperText={
                  touchedFields?.imei && errors?.imei
                    ? errors?.imei?.message
                    : '15 digit IMEI code of phone'
                }
                error={!!errors.imei}
                mulitine={true}
                name={'imei'}
                label={'IMEI'}
                fullWidth={true}
              />
            </Box>
            <Button
              loading={isLoading}
              icon={<QueryStatsOutlined />}
              variant={'contained'}
              fullWidth={true}
              type={'submit'}
              sx={{ my: '1em' }}
            >
              Show Status
            </Button>
          </Box>
        ) : (
          <>
            <Button
              onClickHandler={handleGoBack}
              icon={<ArrowLeft />}
              type={'button'}
              variant={'contained'}
              sx={{ width: '150px', my: '1em' }}
            >
              Go Back
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <StatusCard statusPhone={statusPhone} />
            </Box>
          </>
        )}
      </MuiDialog>
    </>
  );
}

export default function PhoneView() {
  const [statusPhone, setStatusPhone] = useState(null);

  const sm = useMediaQuery('(min-width:800px)');

  const { alertSeverity, handleSnackbarClose, snackbarActions, snackbarMessage, snackbarOpen } =
    useSnackbar();

  const {
    handleOpen: handleDetaislDialogOpen,
    handleClose: handleDetaislDialogClose,
    open: detailsDialogOpen,
  } = useModal();

  const {
    handleOpen: handleStatusModalOpen,
    open: statusModalOpen,
    handleClose: handleStatusModelClose,
  } = useDialog();

  return (
    <>
      <Alert
        alertSeverity={alertSeverity}
        handleSnackbarClose={handleSnackbarClose}
        snackbarMessage={snackbarMessage}
        snackbarOpen={snackbarOpen}
      />
      <>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '200px',
            ':before': {
              position: 'absolute',
              top: '0px',
              content: "''",
              backgroundImage: 'url(/assets/background/mobilebg.jpg)',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              width: '100%',
              height: '100%',
              zIndex: 200,
              backgroundColor: grey['400'],
              backgroundBlendMode: 'multiply',
            },
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 400,
              maxWidth: '80%',
              marginTop: '1em',
            }}
          >
            <Typography
              component={'div'}
              variant={'p'}
              sx={{ fontSize: `${sm ? '2rem' : '1.5rem'}`, fontWeight: '800', color: '#ffff' }}
            >
              We Got You Covered
            </Typography>
          </Box>
        </Box>

        <MuiCard sx={{ height: 'auto', mt: '1em' }}>
          <Typography
            component={'div'}
            variant={'body2'}
            sx={{ fontSize: '1.5rem', color: red['800'] }}
          >
            Note{' '}
            <Typography component={'div'} variant={'body2'} sx={{ color: grey['800'] }}>
              It is important that you have some information about your phone, we might need some
              info about your phone , so we can help you find it
            </Typography>{' '}
          </Typography>
        </MuiCard>

        <Stack
          direction={`${sm ? 'row' : 'column'}`}
          alignItems={`${sm ? 'center' : 'flex-start'}`}
          spacing={2}
          sx={{ my: '2em' }}
        >
          <Button
            type={'button'}
            variant={'contained'}
            onClickHandler={handleDetaislDialogOpen}
            sx={{ my: '2em', width: '300px' }}
          >
            Add Phone Details
          </Button>

          <Button
            sx={{ width: `${!sm && '300px'}` }}
            onClickHandler={handleStatusModalOpen}
            variant={'contained'}
            type={'button'}
          >
            Check Status Of Phone
          </Button>
        </Stack>

        <MuiDialog
          open={detailsDialogOpen}
          handleClose={handleDetaislDialogClose}
          handleOpen={handleDetaislDialogOpen}
          dialogTitle={'Add A Phone'}
          maxWidth={'lg'}
        >
          <PhoneDetails snackbarActions={snackbarActions} />
        </MuiDialog>

        <StatusModel
          open={statusModalOpen}
          handleOpen={handleStatusModalOpen}
          handleClose={handleStatusModelClose}
          snackbarActions={snackbarActions}
          setStatusPhone={setStatusPhone}
          statusPhone={statusPhone}
        />

        <PhoneCards />
      </>
    </>
  );
}
