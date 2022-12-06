import { configureStore } from "@reduxjs/toolkit";
import mapSlice from "./slices/mapSlice";
import userSlice from "./slices/userSlice";

const store = configureStore({
  reducer: {
    // reducerName: reducer
    map: mapSlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
