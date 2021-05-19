import { configureStore } from '@reduxjs/toolkit';
import deliveriesSlice from './deliveries-slice';
import uiSlice from './ui-slice';

const store = configureStore({
  reducer: { ui: uiSlice.reducer, delivery: deliveriesSlice.reducer },
});

export default store;
