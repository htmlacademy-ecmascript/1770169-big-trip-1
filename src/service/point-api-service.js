import ApiService from '../framework/api-service.js';
import Adapter from '../adapter.js';
import {Path, Method} from '../const.js';

export default class PointApiService extends ApiService {
  #adapter = new Adapter();

  get points() {
    return this._load({url: Path.POINTS})
      .then(PointApiService.parseResponse)
      .then((points) => points.map((point) => this.#adapter._adaptPointToClient(point)));
  }

  async createPoint(point) {
    const response = await this._load(
      {
        url: Path.POINTS,
        method: Method.POST,
        body: JSON.stringify(this.#adapter._adaptPointToServer(point)),
        headers: new Headers({'Content-Type': 'application/json'})
      }
    );
    const parsedPoint = await PointApiService.parseResponse(response);
    return this.#adapter._adaptPointToClient(parsedPoint);
  }

  async updatePoint(point) {
    const response = await this._load(
      {
        url: `${Path.POINTS}/${point.id}`,
        method: Method.PUT,
        body: JSON.stringify(this.#adapter._adaptPointToServer(point)),
        headers: new Headers({'Content-Type': 'application/json'})
      }
    );
    const parsedPoint = await PointApiService.parseResponse(response);
    return this.#adapter._adaptPointToClient(parsedPoint);
  }

  async deletePoint(point) {
    await this._load(
      {
        url: `${Path.POINTS}/${point.id}`,
        method: Method.DELETE
      }
    );
  }
}
