import { Button, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DeliveriesTable from '../components/delivery/DeliveriesTable';
import { fetchDeliveries } from '../store/deliveries-slice';

const Deliveries = () => {
  // favourites, snakcbar, statusz állítás
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(fetchDeliveries());
  }, [dispatch]);

  return (
    <>
      <Typography color="error" component="h6">
        {error}
      </Typography>
      <Button
        to="/deliveries/add"
        variant="contained"
        component={Link}
        color="secondary"
      >
        Add delivery
      </Button>
      <DeliveriesTable />
    </>
  );
};

export default Deliveries;
