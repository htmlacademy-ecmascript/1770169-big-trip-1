import {destinations} from '../mock/destinations.js';

export default class DestinationsModel {
  #destinations = null;

  get destinations () {
    this.#destinations = destinations;
    return this.#destinations;
  }

  _getDestinationsById (id) {
    return this.#destinations.find((destination) => destination.id === id);
  }
}
