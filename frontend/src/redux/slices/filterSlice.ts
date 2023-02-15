import { createSlice } from "@reduxjs/toolkit";

export interface filterStateType {
  isEventShow: boolean;
  isBookmarkShow: boolean;
  isPeopleShow: boolean;
  isAccidentShow: boolean;
}

const initialState: filterStateType = {
  isEventShow: true,
  isBookmarkShow: true,
  isPeopleShow: true,
  isAccidentShow: true,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterSetIsEventShow: (state) => {
      state.isEventShow = !state.isEventShow;
    },
    filterSetIsBookmarkShow: (state) => {
      state.isBookmarkShow = !state.isBookmarkShow;
    },
    filterSetIsPeopleShow: (state) => {
      state.isPeopleShow = !state.isPeopleShow;
    },
    filterSetIsAccidentShow: (state) => {
      state.isAccidentShow = !state.isAccidentShow;
    },
    filterInitialize: () => {
      return initialState;
    },
  },
});

export const {
  filterSetIsEventShow,
  filterSetIsBookmarkShow,
  filterSetIsPeopleShow,
  filterSetIsAccidentShow,
  filterInitialize,
} = filterSlice.actions;
export default filterSlice.reducer;
