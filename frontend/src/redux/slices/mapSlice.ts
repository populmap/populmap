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
  search: string;
  isEventShow: boolean;
  isBookmarkShow: boolean;
  isPeopleShow: boolean;
  isAccidentShow: boolean;
  isEventOverlayShow: number;
  isCityAccidentOverlayShow: number;
  isCityOverlayShow: number;
  isBookmarkOverlayShow: number;
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
  search: "",
  isEventShow: false,
  isBookmarkShow: false,
  isPeopleShow: false,
  isAccidentShow: false,
  isEventOverlayShow: -1,
  isCityAccidentOverlayShow: -1,
  isCityOverlayShow: -1,
  isBookmarkOverlayShow: -1,
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    mapLevelUp: (state) => {
      if (state.level > 1) state.level -= 1;
    },
    mapLevelDown: (state) => {
      if (state.level < 14) state.level += 1;
    },
    mapLevelSelect: (state, action: PayloadAction<number>) => {
      state.level = action.payload;
    },
    mapLocationChange: (
      state,
      action: PayloadAction<mapStateType["center"]>
    ) => {
      state.center = action.payload;
    },
    mapSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    mapSetIsEventShow: (state) => {
      state.isEventShow = !state.isEventShow;
    },
    mapSetIsBookmarkShow: (state) => {
      state.isBookmarkShow = !state.isBookmarkShow;
    },
    mapSetIsPeopleShow: (state) => {
      state.isPeopleShow = !state.isPeopleShow;
    },
    mapSetIsAccidentShow: (state) => {
      state.isAccidentShow = !state.isAccidentShow;
    },
    mapSetIsEventOverlayShow: (state, action: PayloadAction<number>) => {
      state.isEventOverlayShow = action.payload;
    },
    mapSetIsCityAccidentOverlayShow: (state, action: PayloadAction<number>) => {
      state.isCityAccidentOverlayShow = action.payload;
    },
    mapSetIsCityOverlayShow: (state, action: PayloadAction<number>) => {
      state.isCityOverlayShow = action.payload;
    },
    mapSetIsBookmarkOverlayShow: (state, action: PayloadAction<number>) => {
      state.isBookmarkOverlayShow = action.payload;
    },
    mapCloseOverlay: (state) => {
      state.isEventOverlayShow = -1;
      state.isCityAccidentOverlayShow = -1;
      state.isCityOverlayShow = -1;
      state.isBookmarkOverlayShow = -1;
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
  mapLocationChange,
  mapInitialize,
  mapSearch,
  mapSetIsEventShow,
  mapSetIsBookmarkShow,
  mapSetIsPeopleShow,
  mapSetIsAccidentShow,
  mapSetIsEventOverlayShow,
  mapSetIsCityAccidentOverlayShow,
  mapSetIsCityOverlayShow,
  mapSetIsBookmarkOverlayShow,
  mapCloseOverlay,
} = mapSlice.actions;
export default mapSlice.reducer;
