import { DialogContent, DialogTitle, Divider, useMediaQuery,Box } from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';
import Dialog from '@mui/material/Dialog';

function MuiDialog({ open, handleOpen, handleClose, maxWidth, children, fullScreen, dialogTitle }) {
  const sm = useMediaQuery('(min-width:800px)');

  return (
    <div>
      <Dialog
        open={open}
        fullScreen={!sm ? true : fullScreen}
        maxWidth={maxWidth}
        fullWidth={true}
        onClose={handleClose}
        // scroll="body"
        PaperProps={{
          style: {
            zIndex: 1301, // Set a value higher than the default modal backdrop
          },
        }}
      >
        <DialogTitle>{dialogTitle}</DialogTitle>
        <Divider />
        {!sm && <Box sx={{ display: 'flex', justifyContent: 'flex-end', aignItems: 'center', p: '1em' }}>
          <CloseOutlined onClick={handleClose} fontSize="large" />
        </Box>}
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </div>
  );
}

export default MuiDialog;
