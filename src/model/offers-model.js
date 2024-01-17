import {ErrorMessage} from '../const';
export default class OffersModel {
  #offersApiService = null;
  #offers = null;

  constructor({offersApiService}) {
    this.#offersApiService = offersApiService;
  }

  get offers() {
    return this.#offers;
  }

  async init() {
    try {
      this.#offers = await this.#offersApiService.offers;
    } catch(err) {
      throw new Error(ErrorMessage.ERROR_OFFERS_MESSAGE);
    }
  }

  _getOffersByType(type) {
    return this.#offers.find((offer) => offer.type === type);
  }

  _getOfferItemsById(type, offersId) {
    const offer = this._getOffersByType(type);

    return offer.offers.filter((item) => offersId.find((id) => item.id === id));
  }
}
