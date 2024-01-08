import {offers} from '../mock/offers.js';

export default class OffersModel {
  #offers = offers;

  get offers () {
    return this.#offers;
  }

  _getOffersByType (type) {
    return this.#offers.find((offer) => offer.type === type);
  }

  _getOfferItemsById (type, offersId) {
    const offer = this._getOffersByType(type);

    return offer.offers.filter((item) => offersId.find((id) => item.id === id));
  }
}
