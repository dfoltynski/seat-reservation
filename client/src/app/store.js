import { configureStore } from "@reduxjs/toolkit";
import seatsConfiguration from "../features/seatsConfiguration";
export default configureStore({
  reducer: {
    seatsConfiguration,
  },
});
