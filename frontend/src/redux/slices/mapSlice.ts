import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface mapStateType {
  center: {
    lat: number;
    lng: number;
  };
  mousePosition: {
    lat: number;
    lng: number;
  };
  level: number;
}

const initialState: mapStateType = {
  center: {
    lat: 37.4882,
    lng: 127.0648,
  },
  mousePosition: {
    lat: 0,
    lng: 0,
  },
  level: 3,
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    mapLevelUp: (state) => {
      state.level += 1;
    },
    mapLevelDown: (state) => {
      state.level -= 1;
    },
    // mapDetectGeolocation: (state, action: PayloadAction<>) => {},
    mapInitialize: (state) => {
      return initialState;
    },
  },
});

export const { mapLevelUp, mapLevelDown, mapInitialize } = mapSlice.actions;
export default mapSlice.reducer;
