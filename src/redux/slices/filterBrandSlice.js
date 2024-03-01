/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { initState } from "../initState";

const filterBrandSlice = createSlice({
  name: "filterBrand",
  initialState: initState.filterBrand,
  reducers: {
    changeSearchBrandFilter(state, action) {
      state.search = action.payload;
    },
  },
});

export const { changeSearchBrandFilter } = filterBrandSlice.actions;
export const getSearchBrandSelector = (state) => state.filterBrand.search;
export const filterBrandReducer = filterBrandSlice.reducer;
