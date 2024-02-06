import { useEffect, useState, useMemo } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Alert from 'src/components/Alert/Alert';
import { ReactFilesPreview } from 'react-files-preview';
import 'react-files-preview/dist/style.css'; /* import css file*/
import { useLocation, useParams } from 'react-router-dom';
import useFetch from 'src/hooks/use-fetch';
// import Button from 'src/components/Button/Button';
import Button from 'src/components/Button/Button';
import Spinner from 'src/components/Spinner/Spinner';

import Dialog from 'src/components/Dialog/Dialog';
import Typography from 'src/components/Typography/Typography';
import { Stack } from '@mui/material';
import { formatDate } from 'src/utils/date-formate';
import { useRouter } from 'src/routes/hooks';
import useSnackbar from 'src/hooks/use-snackbar';
import useDialog from 'src/hooks/use-dialog';
import MarkdownEditor from 'src/components/MarkdownEditor/MarkdownEditor';
import { Email } from '@mui/icons-material';

const PhoneViewPost = () => {
  const [nicPictures, setNicPictures] = useState([]);
  const [phonePictures, setPhonePictures] = useState([]);
  const [content, setContent] = useState('');
  const [post, setPost] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const { back } = useRouter();

  const { phoneId } = useParams();

  const name = queryParams.get('name');

  const { alertSeverity, handleSnackbarClose, snackbarActions, snackbarMessage, snackbarOpen } =
    useSnackbar();

  const { handleClose, handleOpen, open } = useDialog();

  useEffect(() => {
    const fetchPhoneData = async () => {
      try {
        const data = await useFetch().getRequest(`phone/getPhone?phoneId=${phoneId}`);
        setPost(data.phone);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPhoneData();
  }, []);

  useEffect(() => {
    const fetchNicPictures = async () => {
      if (post) {
        const files = await Promise.all(
          post.nicPictures.map(async (url) => {
            const response = await fetch(url);
            const blob = await response.blob();
            return new File([blob], 'nic', { type: 'image/png' });
          })
        );
        setNicPictures(files);
      }
    };

    const fetchPhonePictures = async () => {
      if (post) {
        const files = await Promise.all(
          post.images.map(async (url) => {
            const response = await fetch(url);
            const blob = await response.blob();
            return new File([blob], 'nic', { type: 'image/png' });
          })
        );
        setPhonePictures(files);
      }
    };

    fetchNicPictures();
    fetchPhonePictures();
  }, [post]);

  const handleVerifyPhone = async () => {
    try {
      await useFetch().postRequest('phone/verify-phone', { phoneId });
      snackbarActions('phone verified', 'success', true);
    } catch (err) {
      snackbarActions(err.message, 'error', true);
    }
  };

  const handleEmailSend = async (userEmail) => {
    if (content.length < 15) {
      snackbarActions('message must be of length 15 atleast', 'error', true);
      return;
    }

    try {
      await useFetch().postRequest('phone/sendEmailForQueries', { userEmail, content });
      snackbarActions(`email send succesfully to ${userEmail}`, 'success', true);
      handleClose();
      setContent('');
    } catch (err) {
      snackbarActions(`failed to send email to ${userEmail}`, 'error', true);
    }
  };

  const handleRedirect = () => {
    back();
  };

  return (
    <>
      <Dialog
        dialogTitle={'Send Email'}
        fullScreen={false}
        maxWidth={'md'}
        handleClose={handleClose}
        handleOpen={handleOpen}
        open={open}
      >
        <MarkdownEditor content={content} setContent={setContent} placeholder={'start typing...'} />
        <Stack
          direction={'row'}
          justifyContent={'flex-end'}
          alignItems={'center'}
          spacing={1}
          sx={{ my: '1em' }}
        >
          <Button
            type={'button'}
            variant={'outlined'}
            icon={<Email />}
            onClickHandler={() => handleEmailSend('zainahmed8828@gmail.com')}
          >
            Send
          </Button>
        </Stack>
      </Dialog>
      <Alert
        alertSeverity={alertSeverity}
        handleSnackbarClose={handleSnackbarClose}
        snackbarMessage={snackbarMessage}
        snackbarOpen={snackbarOpen}
      />
      <Card elevation={20}>
        <Box sx={{ p: '1em' }}>
          {!post && !nicPictures.length && !phonePictures?.length ? (
            <>
              <Spinner />
            </>
          ) : (
            <>
              <Typography component={'h2'} variant="h2" sx={{ textAlign: 'center' }}>
                {name}
              </Typography>
              <Typography component={'h3'} variant={'h3'}>
                Pictures Of NIC(NATIONAL IDENITY CARD)
              </Typography>
              <Box sx={{ height: '300px' }}>
                <ReactFilesPreview
                  showSliderCount
                  files={nicPictures}
                  allowEditing
                  showFileSize
                  multiple
                  maxFiles={nicPictures.length}
                  downloadFile
                  disabled
                  removeFile={false}
                />
              </Box>

              {post.images.length > 0 && (
                <>
                  <Typography component={'h3'} variant={'h3'}>
                    Pictures Of Phone
                  </Typography>

                  <Box sx={{ height: '300px' }}>
                    <ReactFilesPreview
                      showSliderCount
                      files={phonePictures}
                      allowEditing
                      showFileSize
                      multiple
                      maxFiles={phonePictures.length}
                      downloadFile
                      disabled
                      removeFile={false}
                    />
                  </Box>
                </>
              )}

              <Typography component={'div'} variant={'h3'}>
                Details
              </Typography>
              <Typography component={'div'} variant={'p'}>
                UserName: {post.userName}
              </Typography>
              <Typography component={'div'} variant={'p'}>
                Phone Model: {post.model}
              </Typography>
              <Typography component={'div'} variant={'p'}>
                Status: {post.status.toString()}
              </Typography>
              <Typography component={'div'} variant={'p'}>
                Status: {formatDate(post.date)}
              </Typography>

              <Stack
                direction={'row'}
                justifyContent={'flex-end'}
                alignItems={'center'}
                spacing={2}
              >
                <Button variant={'outlined'} type={'button'} onClickHandler={handleOpen}>
                  Send Email
                </Button>
                <Button onClickHandler={handleVerifyPhone} variant="outlined" type="button">
                  Verify This Post
                </Button>
                <Button onClickHandler={handleRedirect} variant="outlined" type="button">
                  Back to Dashboard
                </Button>
              </Stack>
            </>
          )}
        </Box>
      </Card>
    </>
  );
};

export default PhoneViewPost;
