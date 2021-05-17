import React from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { REQUEST_STATUSES } from '../constants';

const useRequest = (requestFn, immidiate = false) => {
  const [requestState, setRequestState] = useState({
    status: immidiate ? REQUEST_STATUSES.PENDING : null,
    data: null,
    error: null,
  });

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

  return { sendRequest, ...requestState };
};

export default useRequest;
