import { createSlice } from '@reduxjs/toolkit';
import { isPending, isFulfilled, isRejected } from './redux-util';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    loadingMaskIsVisible: false,
  },
  reducers: {
    showLoadingMask(state, action) {
      state.loadingMaskIsVisible = action.payload.show;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isPending(), (state) => {
      state.loadingMaskIsVisible = true;
    });
    builder.addMatcher(
      (action) => isRejected()(action) || isFulfilled()(action),
      (state) => {
        state.loadingMaskIsVisible = false;
      }
    );
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
