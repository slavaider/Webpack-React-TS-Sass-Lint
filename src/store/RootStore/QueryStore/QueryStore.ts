import { History, Location } from "history";
import { action, makeObservable, observable } from "mobx";
import qs, { ParsedQs } from "qs";

type PrivateFields = "_params" | "_history" | "_location";
export default class QueryStore {
  private _params: ParsedQs = {};

  private _location: Location | undefined;

  private _history: History | undefined;

  constructor() {
    makeObservable<QueryStore, PrivateFields>(this, {
      _params: observable,
      _history: observable,
      _location: observable,

      setHistory: action,
      setParam: action,
    });
  }

  setParam(key: string, value: string): void {
    const nextParams = { ...this._params, [key]: value };

    const nextSearch = qs.stringify(nextParams);

    this._params = nextParams;

    this._history?.replace({
      ...this._location,
      search: nextSearch,
    });
  }

  getParam(key: string): undefined | string | string[] | ParsedQs | ParsedQs[] {
    return this._params[key];
  }

  setHistory(history: History, location: Location): void {
    this._history = history;
    this._location = location;
  }
}
