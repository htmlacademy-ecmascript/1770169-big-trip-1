import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import {EVENT_TYPES, DEFAULT_POINT, DateFormat} from '../const.js';
import {getLastTwoWords, toCapitalize} from '../utils/utils.js';

dayjs.extend(utc);

const createRollupButtonTemplate = () => (
  `<button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>`
);

const createTypeTemplate = (type) => (
  `<div class="event__type-item">
    <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${toCapitalize(type)}</label>
  </div>`
);

const createHeaderTemplate = (
  {
    type,
    basePrice,
    destination,
    isDisabled,
    isSaving,
    isDeleting
  },
  availableCities,
  isNewEvent
) => {
  const deleteButton = isDeleting ? 'Deleting...' : 'Delete';
  const resetButton = !isNewEvent ? 'Cancel' : deleteButton;
  const saveButton = isSaving ? 'Saving...' : 'Save';

  return (
    `<header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>

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
        <input
          class="event__input event__input--destination"
          id="event-destination-1"
          type="text"
          name="event-destination"
          list="destination-list-1"
          required
          value=${destination.name}
          ${isDisabled ? 'disabled' : ''}
        >
        <datalist id="destination-list-1">
          ${availableCities.map((city) => `<option value="${city}"></option>`).join('')}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input
          class="event__input event__input--time"
          id="event-start-time-1"
          type="text"
          name="event-start-time"
          required
          autocomplete="off"
          ${isDisabled ? 'disabled' : ''}
        >
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input
          class="event__input event__input--time"
          id="event-end-time-1"
          type="text"
          name="event-end-time"
          required
          autocomplete="off"
          ${isDisabled ? 'disabled' : ''}
        >
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input
          class="event__input event__input--price"
          id="event-price-1"
          type="number"
          name="event-price"
          value=${basePrice}
          ${isDisabled ? 'disabled' : ''}
        >
      </div>

      <button class="event__save-btn btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>
        ${saveButton}
      </button>
      <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>
        ${resetButton}
      </button>
      ${!isNewEvent ? '' : createRollupButtonTemplate()}
    </header>`
  );
};

const createOfferTemplate = ({id, title, price, isChecked = ''}, isDisabled) => {
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
        ${isDisabled ? 'disabled' : ''}
      >
      <label class="event__offer-label" for="event-offer-${postfix}-1">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`
  );
};

const createOfferListTemplate = ({offers}, isDisabled) => (
  `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
      ${offers.map((offer) => createOfferTemplate(offer, isDisabled)).join('')}
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

const createEventDetailsTemplate = ({destination, offers, isDisabled}) => (
  `<section class="event__details">
    ${offers.offers.length !== 0 ? createOfferListTemplate(offers, isDisabled) : ''}
    ${Object.keys(destination).length > 2 ? createDestinationTemplate(destination) : ''}
  </section>`
);

const createEventEditTemplate = (data, availableCities, isNewEvent) => (
  `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      ${createHeaderTemplate(data, availableCities, isNewEvent)}
      ${createEventDetailsTemplate(data)}
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
  #handleFormReset = null;
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
      offers,
      checkedOffers = [],
      getDestination,
      getOffers,
      onFormSubmit,
      onFormReset,
      onRollupButtonClick = null,
    }
  ) {
    super();
    this.#point = point;
    this.#destination = destination;
    this.#availableCities = availableCities;
    this.#offers = offers;
    this.#checkedOffers = checkedOffers;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormReset = onFormReset;
    this.#handleRollupButtonClick = onRollupButtonClick;
    this.#getDestination = getDestination;
    this.#getOffers = getOffers;
    this._setState(EventEditView.parsePointsToState(
      this.#point,
      this.#destination,
      this.#offers,
      this.#checkedOffers,
    ));
    this._restoreHandlers();
  }

  get template() {
    const isNewEvent = !!this.#handleRollupButtonClick;

    return createEventEditTemplate(this._state, this.#availableCities, isNewEvent);
  }

  _restoreHandlers() {
    this.element.querySelector('.event--edit').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event--edit').addEventListener('reset', this.#handleFormReset);
    if (this.#handleRollupButtonClick !== null) {
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#handleRollupButtonClick);
    }
    this.element.querySelector('.event__type-list').addEventListener('click', this.#eventTypeClickHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__available-offers')?.addEventListener('change', this.#eventChangeHandler);
    this.element.querySelector('.event__input--price')?.addEventListener('change', this.#priceChangeHandler);
    this.#initDatepicker();
  }

  #initDatepicker() {
    const minDateFrom = dayjs().isAfter(dayjs(this.#point.dateFrom)) ? this.#point.dateFrom : 'today';
    const minDateTo = dayjs().isAfter(dayjs(this.#point.dateTo)) ? this.#point.dateTo : 'today';

    this.#startDatepicker = flatpickr(this.element.querySelector('#event-start-time-1'), {
      allowInput: true,
      dateFormat: DateFormat.DATE_PICKER,
      minDate: minDateFrom,
      defaultDate: this.#point.dateFrom,
      enableTime: true,
      onChange: this.#startDateChangeHandler
    });

    this.#endDatepicker = flatpickr(this.element.querySelector('#event-end-time-1'), {
      allowInput: true,
      dateFormat: DateFormat.DATE_PICKER,
      minDate: minDateTo,
      defaultDate: this.#point.dateTo,
      enableTime: true,
      onChange: this.#endDateChangeHandler
    });
  }

  #startDateChangeHandler = ([selectedDates]) => {
    this._setState({dateFrom: dayjs.utc(selectedDates).format()});
    this.#endDatepicker.set('minDate', selectedDates);
  };

  #endDateChangeHandler = ([selectedDates]) => {
    this._setState({dateTo: dayjs.utc(selectedDates).format()});
    this.#startDatepicker.set('maxDate', selectedDates);
  };

  #priceChangeHandler = (evt) => {
    this._setState({basePrice: evt.target.value});
  };

  static parsePointsToState(points, destination, offer, checkedOffers) {
    return {
      ...points,
      destination,
      offers: {
        ...offer,
        offers: offer.offers.map((item) => ({...item, isChecked: checkedOffers.includes(item.id) ? 'checked' : ''}))
      },
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToPoints(state) {
    const points = {...state};
    points.basePrice = points.basePrice ? parseInt(points.basePrice, 10) : 0;
    points.destination = points.destination.id;
    points.offers = points.offers.offers.filter((offer) => offer.isChecked === 'checked').map((offer) => offer.id);

    delete points.isDisabled;
    delete points.isSaving;
    delete points.isDeleting;

    return points;
  }

  reset() {
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
    if (!this.#availableCities.includes(evt.target.value)) {
      this.element.querySelector('.event__save-btn').disabled = true;
      return;
    }
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
