import { Button } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

const Deliveries = () => {
  return (
    <>
      <Button
        to="/deliveries/add"
        variant="contained"
        component={Link}
        color="secondary"
      >
        Add delivery
      </Button>
    </>
  );
};

export default Deliveries;
