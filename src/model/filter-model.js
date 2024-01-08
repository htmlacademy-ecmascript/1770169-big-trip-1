import {FilterType} from '../const';
import Observable from '../framework/observable.js';

export default class FilterModel extends Observable {
  #filter = FilterType.EVERYTHING;

  get filter() {
    return this.#filter;
  }

  set filter({updateType, filterType}) {
    this.#filter = filterType;
    this._notify(updateType, filterType);
  }
}
