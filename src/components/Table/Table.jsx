import * as React from 'react';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import {
  Collapse,
  IconButton,
  Typography,
  TableRow,
  Paper,
  TableHead,
  TableCell,
  Table,
  TableContainer,
  TableBody,
  Box,
} from '@mui/material';
import useFetch from 'src/hooks/use-fetch';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th">{row.name}</TableCell>
        <TableCell>{row.phone}</TableCell>
        <TableCell>{row.status.toString()}</TableCell>
        <TableCell>{row.date}</TableCell>
        <TableCell>
          <Link to={`${row.link}`} sx={{ ':hover': { cursor: 'pointer', color: 'blue' } }}>
            View Post
          </Link>
        </TableCell>
      </TableRow>
      {/* <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow> */}
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

export default function MuiTable() {
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    const fetchPhones = async () => {
      try {
        const rows = await useFetch().getRequest('phone/getallphones');
        const modifiedRows = rows.phones.map((row) => {
          const rowObj = {
            name: row?.owner?.name,
            date: row?.dateRegistered,
            status: row?.verified,
            phone: row?.model,
            link: `post/${row?._id}?name=${row?.model}`,
            history: [
              {
                date: '2020-01-05',
                customerId: '11091700',
                amount: 3,
              },
              {
                date: '2020-01-02',
                customerId: 'Anonymous',
                amount: 1,
              },
            ],
          };

          return rowObj;
        });
        setRows(modifiedRows);
      } catch (err) {
        console.err(err);
      }
    };
    fetchPhones();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Verified</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Link</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
