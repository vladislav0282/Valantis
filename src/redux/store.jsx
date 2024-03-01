import { configureStore } from "@reduxjs/toolkit";
import { REDUX_LS_KEY } from "./constants";
import { gitInitState } from "./initState";
import { filterReducer } from "./slices/filterSlice";
import { filterBrandReducer } from "./slices/filterBrandSlice";
import { filterPriceReducer } from "./slices/filterPriceSlice";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    filterBrand: filterBrandReducer,
    filterPrice: filterPriceReducer,
  },
  preloadedState: gitInitState(),
});

store.subscribe(() =>
  window.localStorage.setItem(REDUX_LS_KEY, JSON.stringify(store.getState()))
);
