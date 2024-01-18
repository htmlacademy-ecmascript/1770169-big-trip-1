import {ErrorMessage} from '../const.js';
export default class DestinationsModel {
  #destinationsApiService = null;
  #destinations = null;

  constructor({destinationsApiService}) {
    this.#destinationsApiService = destinationsApiService;
  }

  get destinations() {
    return this.#destinations;
  }

  async init() {
    try {
      this.#destinations = await this.#destinationsApiService.destinations;
    } catch(err) {
      throw new Error(ErrorMessage.ERROR_DESTINATIONS_MESSAGE);
    }
  }

  _getDestinationsById(id) {
    return this.#destinations.find((destination) => destination.id === id);
  }

  _getDestinationsByName(name) {
    return this.#destinations.find((destination) => destination.name === name);
  }
}
