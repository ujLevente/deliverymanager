import { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { REQUEST_STATUSES } from '../constants';
import { uiActions } from '../store/ui-slice';

const useRequest = (requestFn, useLoadingMask = true, immidiate = false) => {
  const [requestState, setRequestState] = useState({
    status: immidiate ? REQUEST_STATUSES.PENDING : null,
    data: null,
    error: null,
  });

  const dispatch = useDispatch();

  const sendRequest = useCallback(
    async (...params) => {
      setRequestState({
        status: REQUEST_STATUSES.PENDING,
        data: null,
        error: null,
      });

      let result;
      try {
        const data = await requestFn(...params);
        result = { data, error: null, status: REQUEST_STATUSES.COMPLETED };
      } catch (error) {
        result = {
          data: null,
          error: error.message,
          status: REQUEST_STATUSES.ERROR,
        };
      }

      setRequestState(result);
      return result;
    },
    [requestFn]
  );

  useEffect(() => {
    if (useLoadingMask) {
      dispatch(
        uiActions.showLoadingMask({
          show: requestState.status === REQUEST_STATUSES.PENDING,
        })
      );
    }
  }, [dispatch, useLoadingMask, requestState]);

  return { sendRequest, ...requestState };
};

export default useRequest;
