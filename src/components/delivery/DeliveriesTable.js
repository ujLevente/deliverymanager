import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deliveryActions,
  selectAllDeliveries,
} from '../../store/deliveries-slice';
import TableOptions from './TableOptions';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const headers = [
  {
    id: 'id',
    numeric: true,
    disablePadding: true,
    label: 'ID',
  },
  {
    id: 'address',
    numeric: false,
    disablePadding: true,
    label: 'Address',
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: true,
    label: 'Status',
  },
  {
    id: 'contact',
    numeric: true,
    disablePadding: true,
    label: 'Contact',
  },
];

const DeliveriesTable = () => {
  const deliveries = useSelector(selectAllDeliveries);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { orderBy, order, page, rowsPerPage } = useSelector(
    (state) => state.delivery.table
  );
  const getProcessedRows = () => {
    let processedRows = deliveries.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );

    processedRows.sort((el1, el2) => {
      let itemOrder = el1[orderBy] > el2[orderBy] ? 1 : -1;
      itemOrder = order === 'desc' ? itemOrder * -1 : itemOrder;

      if (itemOrder === 0) {
        return el1.id - el2.id;
      }

      return itemOrder;
    });

    return processedRows;
  };

  const handleSortChanged = (headerId) => {
    const isAsc = orderBy === headerId && order === 'asc';

    dispatch(
      deliveryActions.setTable({
        orderBy: headerId,
        order: isAsc ? 'desc' : 'asc',
      })
    );
  };

  const handleChangePage = (_, newPage) => {
    dispatch(deliveryActions.setTable({ page: newPage }));
  };

  const handleChangeRowsPerPage = (event) => {
    const rowsPerPage = parseInt(event.target.value, 10);
    dispatch(deliveryActions.setTable({ page: 0, rowsPerPage }));
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell key={header.id}>
                  <TableSortLabel
                    active={orderBy === header.id}
                    direction={orderBy === header.id ? order : 'asc'}
                    onClick={handleSortChanged.bind(this, header.id)}
                  >
                    {header.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell disablepadding="true" align="right" size="small" />
            </TableRow>
          </TableHead>
          <TableBody>
            {getProcessedRows().map((delivery) => (
              <TableRow key={delivery.id}>
                <TableCell>{delivery.id}</TableCell>
                <TableCell>{delivery.address}</TableCell>
                <TableCell>{delivery.status}</TableCell>
                <TableCell>{delivery.contact}</TableCell>
                <TableCell disablepadding="true" align="right" size="small">
                  <TableOptions id={delivery.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={deliveries.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default DeliveriesTable;
