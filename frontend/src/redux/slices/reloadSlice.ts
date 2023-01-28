import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface reloadStateType {
  active: boolean;
}

const initialState: reloadStateType = {
  active: true,
};

export const reloadSlice = createSlice({
  name: "reload",
  initialState,
  reducers: {
    reloadComponent: (state) => {
      state.active = !state.active;
    },
    reloadInitialize: () => {
      return initialState;
    },
  },
});

export const { reloadComponent, reloadInitialize } = reloadSlice.actions;
export default reloadSlice.reducer;
