import { configureStore } from "@reduxjs/toolkit";
import mapSlice from "./slices/mapSlice";

const store = configureStore({
  reducer: {
    // reducerName: reducer
    map: mapSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
