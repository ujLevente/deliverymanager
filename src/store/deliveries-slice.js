import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';
import { REQUEST_STATUSES } from '../constants';
import { deliveryApi } from '../lib/api';

export const fetchDeliveries = createAsyncThunk(
  'deliveries/fecthDeliveries',
  async () => {
    const deliveries = await deliveryApi.getAll();
    return deliveries;
  }
);

const deliveriesAdapter = createEntityAdapter({
  // selectId: (delivery) => delivery.delivery_id,
});

const initialState = deliveriesAdapter.getInitialState({
  status: null,
  error: null,
  table: {
    orderBy: 'id',
    order: 'asc',
    page: 0,
    rowsPerPage: 5,
    changed: [],
  },
});

const deliveriesSlice = createSlice({
  name: 'deliveries',
  initialState,
  reducers: {
    setTable(state, action) {
      const changed = [];

      for (const [key, value] of Object.entries(action.payload)) {
        if (state.table.hasOwnProperty(key)) {
          changed.push(key);
          state.table[key] = value;
        }
      }

      state.table.changed = changed;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeliveries.fulfilled, deliveriesAdapter.setAll)
      .addMatcher(isPending(), (state) => {
        state.status = REQUEST_STATUSES.PENDING;
      })
      .addMatcher(isRejected(), (state, action) => {
        state.error = action.error.message;
        state.status = REQUEST_STATUSES.ERROR;
      })
      .addMatcher(isFulfilled(), (state) => {
        state.status = REQUEST_STATUSES.COMPLETED;
      });
  },
});

export const deliveryActions = deliveriesSlice.actions;
console.log(deliveryActions.setTableOrderBy);
export const { selectAll: selectAllDeliveries } =
  deliveriesAdapter.getSelectors((state) => state.delivery);

export default deliveriesSlice;
