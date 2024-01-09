import {destinations} from '../mock/destinations.js';

export default class DestinationsModel {
  #destinations = destinations;

  get destinations () {
    return this.#destinations;
  }

  _getDestinationsById (id) {
    return this.#destinations.find((destination) => destination.id === id);
  }

  _getDestinationsByName (name) {
    return this.#destinations.find((destination) => destination.name === name);
  }
}
