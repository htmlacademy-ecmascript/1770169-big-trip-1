import {points} from '../mock/points.js';

export default class PointsModel {
  getPoints () {
    return points;
  }

  getPointById (id) {
    return points.find((point) => point.id === id);
  }
}
