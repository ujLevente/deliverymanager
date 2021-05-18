import { Backdrop, CircularProgress, makeStyles } from '@material-ui/core';
import React from 'react';
import reactDom from 'react-dom';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  circularProgress: {
    animationDuration: '550ms',
    color: '#fff',
  },
}));

const LoadingMask = () => {
  const classes = useStyles();
  const loadingMaskIsVisible = useSelector(
    (state) => state.ui.loadingMaskIsVisible
  );

  return reactDom.createPortal(
    <Backdrop className={classes.backdrop} open={loadingMaskIsVisible}>
      <CircularProgress
        size={50}
        thickness={5}
        disableShrink
        className={classes.circularProgress}
      />
    </Backdrop>,
    document.getElementById('loading-mask-root')
  );
};

export default LoadingMask;
