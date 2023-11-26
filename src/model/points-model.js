import {points} from '../mock/points.js';

export default class PointsModel {
  #points = null;

  get points () {
    this.#points = points;
    return this.#points;
  }

  _getPointById (id) {
    return this.#points.find((point) => point.id === id);
  }
}
