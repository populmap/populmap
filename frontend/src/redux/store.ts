import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import mapSlice from "./slices/mapSlice";
import userSlice from "./slices/userSlice";
import overlaySlice from "./slices/overlaySlice";
import reloadSlice from "./slices/reloadSlice";

const reducer = combineReducers({
  map: mapSlice,
  user: userSlice,
  overlay: overlaySlice,
  reload: reloadSlice,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["overlay", "reload"],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
