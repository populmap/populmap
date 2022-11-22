import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface mapStateType {
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
      if (state.level > 1) state.level -= 1;
    },
    mapLevelDown: (state) => {
      if (state.level <= 12) state.level += 1;
    },
    mapLevelSelect: (state, action: PayloadAction<number>) => {
      state.level = action.payload;
    },
    mapGeolocationDetect: (
      state,
      action: PayloadAction<mapStateType["center"]>
    ) => {
      state.center = action.payload;
    },
    mapInitialize: (state) => {
      return initialState;
    },
  },
});

export const {
  mapLevelUp,
  mapLevelDown,
  mapLevelSelect,
  mapGeolocationDetect,
  mapInitialize,
} = mapSlice.actions;
export default mapSlice.reducer;
