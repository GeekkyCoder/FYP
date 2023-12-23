import { DialogContent, DialogTitle, Divider } from '@mui/material';
import Dialog from '@mui/material/Dialog';

function MuiDialog({ open, handleOpen, handleClose, maxWidth, children, fullScreen, dialogTitle }) {
  return (
    <div>
      <Dialog
        open={open}
        fullScreen={fullScreen}
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
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </div>
  );
}

export default MuiDialog;
