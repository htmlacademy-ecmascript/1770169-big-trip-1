import {ErrorMessage} from '../const';
export default class OffersModel {
  #offersApiService = null;
  #offers = null;

  constructor({offersApiService}) {
    this.#offersApiService = offersApiService;
  }

  async init() {
    try {
      this.#offers = await this.#offersApiService.offers;
    } catch(err) {
      throw new Error(ErrorMessage.ERROR_OFFERS_MESSAGE);
    }
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
