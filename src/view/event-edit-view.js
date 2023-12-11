import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import {EVENT_TYPES, DEFAULT_POINT, DateFormat} from '../const.js';
import {getLastTwoWords, toCapitalize} from '../utils';

dayjs.extend(utc);

const createTypeTemplate = (type) => (
  `<div class="event__type-item">
    <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${toCapitalize(type)}</label>
  </div>`
);

const createHeaderTemplate = (availableCities, {type, basePrice, destination}) => (
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
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value=${destination.name} list="destination-list-1">
      <datalist id="destination-list-1">
        ${availableCities.map((city) => `<option value="${city}"></option>`).join('')}
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time">
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

const createOfferTemplate = ({id, title, price, isChecked = ''}) => {
  const postfix = getLastTwoWords(title);

  return (
    `<div class="event__offer-selector">
      <input
        class="event__offer-checkbox
        visually-hidden"
        id="event-offer-${postfix}-1"
        type="checkbox"
        data-offer-id = ${id}
        name="event-offer-${postfix}"
        ${isChecked}
      >
      <label class="event__offer-label" for="event-offer-${postfix}-1">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`
  );
};

const createOfferListTemplate = ({offers}) => (
  `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
      ${offers.map((offer) => createOfferTemplate(offer)).join('')}
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
        ${pictures.length !== 0 ? pictures.map((picture) => createPhotoTemplate(picture)).join('') : ''}
      </div>
    </div>
  </section>`
);

const createEventDetailsTemplate = ({destination, offers}) => (
  `<section class="event__details">
    ${offers.offers.length !== 0 ? createOfferListTemplate(offers) : ''}
    ${Object.keys(destination).length > 2 ? createDestinationTemplate(destination) : ''}
  </section>`
);

const createEventEditTemplate = (
  point,
  availableCities
) => (
  `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      ${createHeaderTemplate(availableCities, point)}
      ${createEventDetailsTemplate(point)}
    </form>
  </li>`
);

export default class EventEditView extends AbstractStatefulView {
  #point = null;
  #destination = null;
  #availableCities = null;
  #offers = null;
  #checkedOffers = null;
  #handleFormSubmit = null;
  #handleRollupButtonClick = null;
  #getDestination = null;
  #getOffers = null;
  #startDatepicker = null;
  #endDatepicker = null;

  constructor (
    {
      point = DEFAULT_POINT,
      destination = DEFAULT_POINT.destination,
      availableCities,
      offers = DEFAULT_POINT.offers,
      checkedOffers = [],
      onFormSubmit,
      onRollupButtonClick,
      getDestination,
      getOffers
    }
  ) {
    super();
    this.#point = point;
    this.#destination = destination;
    this.#availableCities = availableCities;
    this.#offers = offers;
    this.#checkedOffers = checkedOffers;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleRollupButtonClick = onRollupButtonClick;
    this.#getDestination = getDestination;
    this.#getOffers = getOffers;
    this._setState(EventEditView.parsePointsToState(this.#point, this.#destination, this.#offers, this.#checkedOffers));
    this._restoreHandlers();
  }

  get template () {
    return createEventEditTemplate(
      this._state,
      this.#availableCities
    );
  }

  _restoreHandlers () {
    this.element.querySelector('.event--edit').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#handleRollupButtonClick);
    this.element.querySelector('.event__type-list').addEventListener('click', this.#eventTypeClickHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__available-offers')?.addEventListener('change', this.#eventChangeHandler);
    this.element.querySelector('.event__input--price')?.addEventListener('change', this.#priceChangeHandler);
    this.#initDatepicker();
  }

  #initDatepicker () {
    this.#startDatepicker = flatpickr(this.element.querySelector('#event-start-time-1'), {
      dateFormat: DateFormat.DATE_PICKER,
      defaultDate: this.#point.dateFrom,
      onChange: this.#startDateChangeHandler
    });

    this.#endDatepicker = flatpickr(this.element.querySelector('#event-end-time-1'), {
      dateFormat: DateFormat.DATE_PICKER,
      defaultDate: this.#point.dateTo,
      onChange: this.#endDateChangeHandler
    });
  }

  #startDateChangeHandler = ([selectedDates]) => {
    this._setState({dateFrom: dayjs.utc(selectedDates).format()});
  };

  #endDateChangeHandler = ([selectedDates]) => {
    this._setState({dateTo: dayjs.utc(selectedDates).format()});
  };

  #priceChangeHandler = (evt) => {
    const value = parseInt(evt.target.value, 10);
    if (isNaN(value)) {
      return;
    }
    this._setState({basePrice: value});
  };

  static parsePointsToState (points, destination, offer, checkedOffers) {
    return {
      ...points,
      destination,
      offers: {
        ...offer,
        offers: offer.offers.map((item) => ({...item, isChecked: checkedOffers.includes(item.id) ? 'checked' : ''}))
      }
    };
  }

  static parseStateToPoints (state) {
    const points = {...state};
    points.destination = points.destination.id;
    points.offers = points.offers.offers.filter((offer) => offer.isChecked === 'checked').map((offer) => offer.id);

    return points;
  }

  reset () {
    this.updateElement(EventEditView.parsePointsToState(this.#point, this.#destination, this.#offers, this.#checkedOffers));
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EventEditView.parseStateToPoints(this._state));
  };

  #eventTypeClickHandler = (evt) => {
    if (evt.target.closest('.event__type-input')) {
      const offers = this.#getOffers(evt.target.value);
      this.updateElement(
        {
          type: evt.target.value,
          offers,
        }
      );
    }
  };

  #destinationChangeHandler = (evt) => {
    const destination = this.#getDestination(evt.target.value);
    this.updateElement({destination});
  };

  #eventChangeHandler = (evt) => {
    if (evt.target.closest('.event__offer-selector')) {
      const offerId = evt.target.dataset.offerId;

      this._setState(
        {
          offers: {
            ...this._state.offers,
            offers: this._state.offers.offers.map(
              (offer) => offer.id === offerId ?
                {...offer, isChecked: offer.isChecked === 'checked' ? '' : 'checked'} :
                offer
            )
          }
        }
      );
    }
  };
}
