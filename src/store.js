import { configureStore } from '@reduxjs/toolkit';
import seatBookingReducer from './redux/seatBookingSlice';

export const store = configureStore({
  reducer: {
    seatBooking: seatBookingReducer,
  },
});

