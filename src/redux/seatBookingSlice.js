import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  currentBus: null,
  bookedSeats: {},
};

// Create the slice
const seatBookingSlice = createSlice({
  name: 'seatBooking',
  initialState,
  reducers: {
    setCurrentBus: (state, action) => {
      state.currentBus = action.payload;
    },
    bookSeats: (state, action) => {
      if (state.currentBus) {
        state.bookedSeats[state.currentBus] = [
          ...(state.bookedSeats[state.currentBus] || []),
          ...action.payload,
        ];
      }
    },
  },
});

// Export the actions and reducer
export const { setCurrentBus, bookSeats } = seatBookingSlice.actions;
export default seatBookingSlice.reducer;
