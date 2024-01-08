import {points} from '../mock/points.js';
import Observable from '../framework/observable.js';

export default class PointsModel extends Observable {
  #points = points;

  get points () {
    return this.#points;
  }

  _getPointById (id) {
    return this.#points.find((point) => point.id === id);
  }

  _addPoint (updateType, update) {
    this.#points = [update, ...this.#points];
    this._notify(updateType, update);
  }

  _updatePoint (updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('The point could not be updated, this point was not found');
    }

    this.#points = [...this.#points.slice(0, index), update, ...this.#points.slice(index + 1)];
    this._notify(updateType, update);
  }

  _deletePoint (updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('The point could not be deleted, this point was not found');
    }

    this.#points = [...this.#points.slice(0, index), ...this.#points.slice(index + 1)];
    this._notify(updateType, update);
  }
}
