import {
  Box,
  Button,
  Divider,
  IconButton,
  makeStyles,
  Popover,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React, { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  popoverButton: {
    textTransform: 'capitalize',
  },
}));

const TableOptions = ({ id }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState();
  const open = !!anchorEl;

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleAddFavourite = () => {
    handlePopoverClose();
  };

  return (
    <div>
      <IconButton onClick={handlePopoverOpen}>
        <MoreVertIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
      >
        <Box width="150px" display="flex" flexDirection="column">
          <Button
            onClick={handleAddFavourite}
            className={classes.popoverButton}
          >
            Add favourite
          </Button>
          <Divider />
          <Button className={classes.popoverButton}>Delete</Button>
        </Box>
      </Popover>
    </div>
  );
};

export default TableOptions;
