import {createElement} from '../render';

const createOfferTemplate = () => (
  `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>
    <label class="event__offer-label" for="event-offer-luggage-1">
      <span class="event__offer-title">Add luggage</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">50</span>
    </label>
  </div>`
);

const createOfferListTemplate = () => (
  `<section class="event__section  event__section--offers">
  <h3 class="event__section-title  event__section-title--offers">Offers</h3>
  <div class="event__available-offers">
  ${createOfferTemplate()}
  </div>
</section>`
);

export default class OfferListView {
  getTemplate () {
    return createOfferListTemplate();
  }

  getElement () {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement () {
    this.element = null;
  }
}
