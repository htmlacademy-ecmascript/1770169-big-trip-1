import {UpdateType} from '../const.js';
import Observable from '../framework/observable.js';

export default class DestinationsModel extends Observable {
  #destinationsApiService = null;
  #destinations = [];

  constructor({destinationsApiService}) {
    super();
    this.#destinationsApiService = destinationsApiService;
  }

  async init() {
    try {
      this.#destinations = await this.#destinationsApiService.destinations;
    } catch(err) {
      this.#destinations = [];
    }

    this._notify(UpdateType.INIT);
  }

  get destinations() {
    return this.#destinations;
  }

  _getDestinationsById(id) {
    return this.#destinations.find((destination) => destination.id === id);
  }

  _getDestinationsByName(name) {
    return this.#destinations.find((destination) => destination.name === name);
  }
}
