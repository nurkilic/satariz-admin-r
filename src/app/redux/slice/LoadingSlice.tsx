import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../index";

const loadingSlice = createSlice({
  name: "loading",
  initialState: { value: false },
  reducers: {
    showLoading: (state) => {
      state.value = true;
    },
    hideLoading: (state) => {
      state.value = false;
    },
    toggleLoading: (state) => {
      state.value = !state.value;
    },
  },
});

export const { showLoading, hideLoading, toggleLoading } = loadingSlice.actions;

export default loadingSlice.reducer;

// Selector functions to access the loading state
export const selectLoading = (state: RootState) => state.loadingReducer.value;
