import React, { createContext } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import DeviceStore, { Device } from "./store/DeviceStore";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import SearchStore, { DeviceSearch } from "./store/SearchStore";

export type ContextType = {
  device: Device[];
  devicesSearch: DeviceSearch[];
};

export const Context = createContext<any>(null);

ReactDOM.render(
  <Provider store={store}>
    <Context.Provider
      value={{
        device: new DeviceStore(),
        searchStore: new SearchStore(),
      }}
    >
      <App />
    </Context.Provider>
  </Provider>,
  document.getElementById("root")
);
