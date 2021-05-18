import { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { REQUEST_STATUSES } from '../constants';
import { uiActions } from '../store/ui-slice';

const useRequest = (requestFn, useLoadingMask = true, immidiate = false) => {
  // const [requestState, setRequestState] = useState({
  //   status: immidiate ? REQUEST_STATUSES.PENDING : null,
  //   data: null,
  //   error: null,
  // });

  const [data, setData] = useState();
  const [error, setError] = useState();
  const [status, setStatus] = useState(
    immidiate ? REQUEST_STATUSES.PENDING : null
  );

  const dispatch = useDispatch();

  const sendRequest = useCallback(
    async (...params) => {
      // setRequestState({
      //   status: REQUEST_STATUSES.PENDING,
      //   data: null,
      //   error: null,
      // });

      setStatus(REQUEST_STATUSES.PENDING);
      setError(null);
      setData(null);

      let result;
      try {
        const data = await requestFn(...params);
        result = { data, error: null, status: REQUEST_STATUSES.COMPLETED };
        setData(data);
        setStatus(REQUEST_STATUSES.COMPLETED);
      } catch (error) {
        result = {
          data: null,
          error: error.message,
          status: REQUEST_STATUSES.ERROR,
        };
        setError(error.messgae);
        setStatus(REQUEST_STATUSES.ERROR);
      }

      // setRequestState(result);
      return result;
    },
    [requestFn]
  );

  useEffect(() => {
    if (useLoadingMask) {
      dispatch(
        uiActions.showLoadingMask({
          show: status === REQUEST_STATUSES.PENDING,
          // show: requestState.status === REQUEST_STATUSES.PENDING,
        })
      );
    }
  }, [dispatch, useLoadingMask, status]);

  return { sendRequest, data, error, status };
};

export default useRequest;
