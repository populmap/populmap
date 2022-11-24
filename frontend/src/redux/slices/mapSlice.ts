import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import mapEnum from "../../types/enum/map.level.enum";

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
    lat: mapEnum.DEFAULT_LAT,
    lng: mapEnum.DEFAULT_LNG,
  },
  mousePosition: {
    lat: 0,
    lng: 0,
  },
  level: mapEnum.DEFAULT_MAP_LEVEL,
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    mapLevelUp: (state) => {
      if (state.level > mapEnum.MIN_LEVEL) state.level -= 1;
    },
    mapLevelDown: (state) => {
      if (state.level <= mapEnum.MAX_LEVEL) state.level += 1;
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
    mapInitialize: () => {
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
