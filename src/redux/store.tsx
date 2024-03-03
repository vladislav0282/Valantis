import { configureStore } from "@reduxjs/toolkit";
import { REDUX_LS_KEY } from "./constants";
import { gitInitState } from "./initState";
import { filterReducer } from "./slices/filterSlice";
import { filterBrandReducer } from "./slices/filterBrandSlice";
import { filterPriceReducer } from "./slices/filterPriceSlice";
import { Reducer } from "redux";

interface RootState {
  filter: {
    search: string;
  };
  filterBrand: {
    search: string;
  };
  filterPrice: {
    search: number;
  };
}

export const store = configureStore<RootState, any>({
  reducer: {
    filter: filterReducer as Reducer<RootState["filter"]>,
    filterBrand: filterBrandReducer as Reducer<RootState["filterBrand"]>,
    filterPrice: filterPriceReducer as Reducer<RootState["filterPrice"]>,
  },
  preloadedState: gitInitState(),
});

store.subscribe(() =>
  window.localStorage.setItem(REDUX_LS_KEY, JSON.stringify(store.getState()))
);
