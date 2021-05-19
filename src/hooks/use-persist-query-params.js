import { useCallback, useEffect, useRef } from 'react';
import { useHistory, useLocation } from 'react-router';

const usePersistQueryParams = (state, onOutsideUrlChange) => {
  // inkább csak get query params from url nek meg set queryp nak lne lenni
  const history = useHistory();
  const { pathName, search } = useLocation();
  const queryParamsRef = useRef('');

  const initailizeQueryParamsFromState = useCallback(() => {
    let queryParamsFromState = Object.entries(state)
      .map((entry) => {
        const [key, value] = entry;
        return `${key}=${value}`;
      })
      .join('&');

    queryParamsFromState = `?${queryParamsFromState}`;
    console.log(queryParamsFromState, state, 'asd');
    history.push({
      pathName,
      search: queryParamsFromState,
    });

    queryParamsRef.current = queryParamsFromState;
  }, [history, pathName, state]);

  useEffect(() => {
    console.log(search === '');
    if (search !== queryParamsRef.current) {
      const searchParamsObj = {};

      new URLSearchParams(search).forEach((value, key) => {
        searchParamsObj[key] = isNaN(value) ? value : parseInt(value);
      });

      queryParamsRef.current = search;
      onOutsideUrlChange({});
    } else {
      initailizeQueryParamsFromState();
    }
  }, [initailizeQueryParamsFromState, onOutsideUrlChange, search]);
};

export default usePersistQueryParams;
