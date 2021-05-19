import { IconButton, Popover } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React from 'react';

const TableOptions = ({ id }) => {
  return (
    <div>
      <IconButton>
        <MoreVertIcon />
      </IconButton>
      {/* <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography className={classes.typography}>
          The content of the Popover.
        </Typography>
      </Popover> */}
    </div>
  );
};

export default TableOptions;
