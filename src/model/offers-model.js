import {UpdateType} from '../const.js';
import Observable from '../framework/observable.js';

export default class OffersModel extends Observable {
  #offersApiService = null;
  #offers = [];

  constructor({offersApiService}) {
    super();
    this.#offersApiService = offersApiService;
  }

  async init() {
    try {
      this.#offers = await this.#offersApiService.offers;
    } catch(err) {
      this.#offers = [];
    }

    this._notify(UpdateType.INIT);
  }

  get offers() {
    return this.#offers;
  }

  _getOffersByType(type) {
    return this.#offers.find((offer) => offer.type === type);
  }

  _getOfferItemsById(type, offersId) {
    const offer = this._getOffersByType(type);

    return offer.offers.filter((item) => offersId.find((id) => item.id === id));
  }
}
