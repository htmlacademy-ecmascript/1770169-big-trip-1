import {destinations} from '../mocks/destinations.js';

export default class DestinationsModel {
  getDestinations () {
    this.destinations = destinations;
    return destinations;
  }

  getDestinationsById (id) {
    return this.destinations.find((destination) => destination.id === id);
  }
}
