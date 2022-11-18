import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface mapStateType {
  userLat: number;
  userLng: number;
  mouseLat: number;
  mouseLng: number;
  level: number;
}
const initialState: mapStateType = {
  userLat: 37.4882,
  userLng: 127.0648,
  mouseLat: 0,
  mouseLng: 0,
  level: 3,
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    mapInitialize: (state) => {
      return initialState;
    },
  },
});

export const { mapInitialize } = mapSlice.actions;
export default mapSlice.reducer;
