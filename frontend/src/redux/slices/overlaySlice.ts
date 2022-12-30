import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface overlayStateType {
  isEventOverlayNumber: number;
  isCityAccidentOverlayNumber: number;
  isCityOverlayNumber: number;
  isBookmarkOverlayNumber: number;
}

const initialState: overlayStateType = {
  isEventOverlayNumber: -1,
  isCityAccidentOverlayNumber: -1,
  isCityOverlayNumber: -1,
  isBookmarkOverlayNumber: -1,
};

export const overlaySlice = createSlice({
  name: "overlay",
  initialState,
  reducers: {
    overlaySetIsEventOverlayNumber: (state, action: PayloadAction<number>) => {
      state.isEventOverlayNumber = action.payload;
    },
    overlaySetIsCityAccidentOverlayNumber: (
      state,
      action: PayloadAction<number>
    ) => {
      state.isCityAccidentOverlayNumber = action.payload;
    },
    overlaySetIsCityOverlayNumber: (state, action: PayloadAction<number>) => {
      state.isCityOverlayNumber = action.payload;
    },
    overlaySetIsBookmarkOverlayNumber: (
      state,
      action: PayloadAction<number>
    ) => {
      state.isBookmarkOverlayNumber = action.payload;
    },
    overlayClose: (state) => {
      state.isEventOverlayNumber = -1;
      state.isCityAccidentOverlayNumber = -1;
      state.isCityOverlayNumber = -1;
      state.isBookmarkOverlayNumber = -1;
    },
    overlayInitialize: () => {
      return initialState;
    },
  },
});

export const {
  overlaySetIsEventOverlayNumber,
  overlaySetIsCityAccidentOverlayNumber,
  overlaySetIsCityOverlayNumber,
  overlaySetIsBookmarkOverlayNumber,
  overlayClose,
} = overlaySlice.actions;
export default overlaySlice.reducer;
