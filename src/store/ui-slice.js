import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    loadingMaskIsVisible: false,
    notification: null,
  },
  reducers: {
    showLoadingMask(state, action) {
      state.loadingMaskIsVisible = action.payload.show;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
