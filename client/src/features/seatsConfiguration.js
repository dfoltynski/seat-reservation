import { createSlice } from "@reduxjs/toolkit";

export const seatsConfigurationSlice = createSlice({
  name: "seatsConfiguration",
  initialState: {
    seats: [],
  },
  reducers: {
    addSeatsConfiguration: (state, action) => {
      state.seats = action.payload;
    },
  },
});

export const { addSeatsConfiguration } = seatsConfigurationSlice.actions;

export default seatsConfigurationSlice.reducer;
