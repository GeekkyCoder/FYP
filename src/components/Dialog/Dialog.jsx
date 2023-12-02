import Dialog from '@mui/material/Dialog';

function MuiDialog({ open, handleOpen, handleClose, maxWidth, children,fullScreen }) {
  return (
    <div>
      <Dialog
        open={open}
        fullScreen={fullScreen}
        maxWidth={maxWidth}
        fullWidth={true}
        onClose={handleClose}
        scroll="body"
      >
        {children}
      </Dialog>
    </div>
  );
}

export default MuiDialog;
