import {UpdateType, ErrorMessage} from '../const';
import Observable from '../framework/observable';
export default class PointsModel extends Observable {
  #pointApiService = null;
  #destinationsModel = null;
  #offersModel = null;
  #points = [];

  constructor({pointApiService, destinationsModel, offersModel}) {
    super();
    this.#pointApiService = pointApiService;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  get points() {
    return this.#points;
  }

  async init() {
    try {
      await this.#destinationsModel.init();
      await this.#offersModel.init();
      this.#points = await this.#pointApiService.points;
    } catch(err) {
      this.#points = [];
    }

    this._notify(UpdateType.INIT);
  }

  _getPointById(id) {
    return this.#points.find((point) => point.id === id);
  }

  async _createPoint(updateType, update) {
    try {
      const response = await this.#pointApiService.createPoint(update);
      this.#points = [response, ...this.#points];
      this._notify(updateType, update);
    } catch(err) {
      throw new Error(ErrorMessage.ERROR_CREATE_MESSAGE);
    }
  }

  async _updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(ErrorMessage.ERROR_UPDATE_MESSAGE);
    }

    try {
      const response = await this.#pointApiService.updatePoint(update);
      this.#points = [...this.#points.slice(0, index), response, ...this.#points.slice(index + 1)];
      this._notify(updateType, update);
    } catch(err) {
      throw new Error(ErrorMessage.ERROR_UPDATE_MESSAGE);
    }
  }

  async _deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(ErrorMessage.ERROR_DELETE_MESSAGE);
    }

    try {
      await this.#pointApiService.deletePoint(update);
      this.#points = [...this.#points.slice(0, index), ...this.#points.slice(index + 1)];
      this._notify(updateType);
    } catch(err) {
      throw new Error(ErrorMessage.ERROR_DELETE_MESSAGE);
    }
  }
}
