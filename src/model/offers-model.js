import {offers} from '../mock/offers.js';

export default class OffersModel {
  getOffers () {
    this.offers = offers;
    return offers;
  }

  getOffersByType (type) {
    return this.offers.find((offer) => offer.type === type);
  }

  getOfferItemsById (type, itemsId) {
    const offer = this.getDataByType(type);

    return offer.offers.filter((item) => itemsId.find((id) => item.id === id));
  }
}
