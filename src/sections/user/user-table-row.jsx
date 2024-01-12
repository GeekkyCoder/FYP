import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import useFetch from 'src/hooks/use-fetch';
import Spinner from 'src/components/Spinner/Spinner';
import useSnackbar from 'src/hooks/use-snackbar';
import MuiAlert from 'src/components/Alert/Alert';

// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  id,
  name,
  avatarUrl,
  role,
  isVerified,
  status,
  handleClick,
  row,
  setIsUserDeleted,
}) {
  const [open, setOpen] = useState(null);
  const [loading, setLoading] = useState(false);

  const { alertSeverity, handleSnackbarClose, snackbarActions, snackbarMessage, snackbarOpen } =
    useSnackbar();

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleDelete = async (rowId) => {
    setLoading(true);
    try {
      await useFetch().deleteRequest(`user/delete-user?id=${rowId}`);
      setIsUserDeleted(true);
      setLoading(false);
      snackbarActions('account deleted', 'success', true);
    } catch (err) {
      setIsUserDeleted(false);
      setLoading(false);
      snackbarActions(err?.message, 'error', true);
    }
  };

  return (
    <>
      <MuiAlert
        alertSeverity={alertSeverity}
        handleSnackbarClose={handleSnackbarClose}
        snackbarMessage={snackbarMessage}
        snackbarOpen={snackbarOpen}
        origin={{ horizontal: 'center', vertical: 'bottom' }}
      />
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={(e) => handleClick(e, name)} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={avatarUrl} />
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{role}</TableCell>

        <TableCell align="center">{isVerified ? 'Yes' : 'No'}</TableCell>

        <TableCell>
          <Label color={(status === 'banned' && 'error') || 'success'}>{status}</Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={() => handleDelete(id)}>
          <Iconify icon="material-symbols-light:delete-outline" sx={{ mr: 2, color: 'red' }} />
          {!loading ? 'Delete' : <Spinner />}
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  company: PropTypes.any,
  handleClick: PropTypes.func,
  isVerified: PropTypes.any,
  name: PropTypes.any,
  role: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
};
