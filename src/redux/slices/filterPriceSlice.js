/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { initState } from "../initState";

const filterPriceSlice = createSlice({
  name: "filterPrice",
  initialState: initState.filterPrice,
  reducers: {
    changeSearchPriceFilter(state, action) {
      state.search = action.payload;
    },
  },
});

export const { changeSearchPriceFilter } = filterPriceSlice.actions;
export const getSearchPriceSelector = (state) => state.filterPrice.search;
export const filterPriceReducer = filterPriceSlice.reducer;
