import { makeAutoObservable } from "mobx";

export interface DeviceSearch {
  id?: string;
  brand?: string | null;
  price?: number;
  product?: string;
}

export default class SearchStore {
  _devicesSearch?: DeviceSearch[];
  _deviceSearchId?: any;

  constructor() {
    this._devicesSearch = [];
    this._deviceSearchId = null;
    makeAutoObservable(this);
  }

  setDeviceSearch(devicesSearch: DeviceSearch[]) {
    this._devicesSearch = devicesSearch;
  }

  setDeviceSearchId(deviceSearchId: any) {
    this._deviceSearchId = deviceSearchId;
  }

  get devicesSearch() {
    return this._devicesSearch;
  }
}
