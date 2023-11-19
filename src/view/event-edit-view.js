import dayjs from 'dayjs';
import {createElement} from '../render';
import {getLastTwoWords, toCapitalize} from '../utils';

const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const DEFAULT_POINT = {
  type: 'taxi',
  dateFrom: dayjs(),
  dateTo: dayjs().hour(1),
  destination: {
    name: 'Chamonix',
    description: 'Chamonix, is a beautiful city, a true asian pearl, with a beautiful old town.',
    pictures: [
      {
        src: 'https://20.ecmascript.pages.academy/static/destinations/4.jpg',
        description: 'Chamonix embankment'
      },
      {
        src: 'https://20.ecmascript.pages.academy/static/destinations/8.jpg',
        description: 'Chamonix park'
      },
      {
        src: 'https://20.ecmascript.pages.academy/static/destinations/15.jpg',
        description: 'Chamonix kindergarten'
      },
      {
        src: 'https://20.ecmascript.pages.academy/static/destinations/16.jpg',
        description: 'Chamonix biggest supermarket'
      },
      {
        src: 'https://20.ecmascript.pages.academy/static/destinations/19.jpg',
        description: 'Chamonix street market'
      }
    ]
  },
  basePrice: 10,
  isFavorite: false,
  offers: {
    type: 'taxi',
    offers: [
      {
        id: '96e801da-19f2-415a-aa24-5a915f325a35',
        title: 'Upgrade to a business class',
        price: 190
      },
      {
        id: '729b6025-85de-485a-9a01-e18db921e4b6',
        title: 'Choose the radio station',
        price: 30
      },
      {
        id: '209d6f48-5ac5-4970-bd0d-3dfc4f932ae6',
        title: 'Choose temperature',
        price: 170
      },
      {
        id: 'ba40315d-09e4-4c03-b824-eee045bc5178',
        title: 'Drive quickly, I\'m in a hurry',
        price: 100
      },
      {
        id: '5a360f33-4a66-449a-bef8-707cc7376b2a',
        title: 'Drive slowly',
        price: 110
      }
    ]
  }
};

const createTypeTemplate = (type) => (
  `<div class="event__type-item">
    <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${toCapitalize(type)}</label>
  </div>`
);

const createHeaderTemplate = ({name}, availableCities, {type, dateFrom, dateTo, basePrice}) => (
  `<header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          ${EVENT_TYPES.map((item) => createTypeTemplate(item)).join('')}
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value=${name} list="destination-list-1">
      <datalist id="destination-list-1">
        ${availableCities.map((city) => `<option value=${city}></option>`).join('')}
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value=${dayjs(dateFrom).format('DD/MM/YY[&nbsp;]HH:mm')}>
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value=${dayjs(dateTo).format('DD/MM/YY[&nbsp;]HH:mm')}>
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value=${basePrice}>
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Delete</button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </header>`
);

const createOfferTemplate = ({id, title, price}, checkedOffers) => {
  const prefix = getLastTwoWords(title);
  const checked = checkedOffers.includes(id) ? 'checked' : '';

  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${prefix}-1" type="checkbox" name="event-offer-${prefix}" ${checked}>
      <label class="event__offer-label" for="event-offer-${prefix}-1">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`
  );
};

const createOfferListTemplate = ({offers}, checkedOffers) => (
  `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
      ${offers.map((offer) => createOfferTemplate(offer, checkedOffers)).join('')}
    </div>
  </section>`
);

const createPhotoTemplate = ({src, description}) => `<img class="event__photo" src=${src} alt=${description}>`;

const createDestinationTemplate = ({description, pictures}) => (
  `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${description}</p>

    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${pictures.length && pictures.map((picture) => createPhotoTemplate(picture)).join('')}
      </div>
    </div>
  </section>`
);

const createEventDetailsTemplate = (destination, offers, checkedOffers) => (
  `<section class="event__details">
    ${offers.offers.length && createOfferListTemplate(offers, checkedOffers)}
    ${Object.keys(destination).length > 2 && createDestinationTemplate(destination)}
  </section>`
);

const createEventEditTemplate = (
  point,
  destination,
  availableCities,
  offers,
  checkedOffers
) => (
  `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      ${createHeaderTemplate(destination, availableCities, point)}
      ${createEventDetailsTemplate(destination, offers, checkedOffers)}
    </form>
  </li>`
);

export default class EventEditView {
  constructor (
    {
      point = DEFAULT_POINT,
      destination = DEFAULT_POINT.destination,
      availableCities,
      offers = DEFAULT_POINT.offers,
      checkedOffers = []
    }
  ) {
    this.point = point;
    this.destination = destination;
    this.availableCities = availableCities;
    this.offers = offers;
    this.checkedOffers = checkedOffers;
  }

  getTemplate () {
    return createEventEditTemplate(
      this.point,
      this.destination,
      this.availableCities,
      this.offers,
      this.checkedOffers
    );
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
