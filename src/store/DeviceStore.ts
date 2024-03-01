import { makeAutoObservable, action } from "mobx";

// для того чтобы реакт следил за этими переменными и при их изменении страница будет перерендориваться

export interface Result {
  result: [
    { id?: string; brand?: string | null; price?: number; product?: string }
  ];
}

export interface Device {
  id?: string;
  brand?: string | null;
  price?: number;
  product?: string;
}

export interface Params {
  action?: string;
  params?: { field?: string; offset?: number; limit: number };
}

export default class DeviceStore {
  _devices?: Device[];

  _devicesId?: string[];

  _field?: string;

  _page?: number;

  _offset?: number;

  _limit?: number;

  _totalCount?: number;

  constructor() {
    this._devices = [];
    this._devicesId = [];
    this._page = 1;
    this._totalCount = 0;
    this._offset = 0;
    this._limit = 50;
    makeAutoObservable(this);
  }

  setDevice(devices: Device[]) {
    this._devices = devices;
  }

  setDevicesId(devicesId: string[]) {
    this._devicesId = devicesId;
  }

  @action
  setPage(page: number) {
    this._page = page;
  }

  setOffset(offset: number) {
    this._offset = offset;
  }

  setLimit(limit: number) {
    this._limit = limit;
  }

  setTotalCount(totalCount: number) {
    this._totalCount = totalCount;
  }

  get devices() {
    return this._devices;
  }

  get offset() {
    return this._offset;
  }

  get page() {
    return this._page;
  }

  get limit() {
    return this._limit;
  }

  get totalCount() {
    return this._totalCount;
  }
}
