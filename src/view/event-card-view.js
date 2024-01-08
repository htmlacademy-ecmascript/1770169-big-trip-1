import AbstractView from '../framework/view/abstract-view.js';
import dayjs from 'dayjs';
import {toCapitalize, getAbbreviatedFormat} from '../utils/utils.js';
import {DateFormat} from '../const.js';

const createOfferTemplate = ({title, price}) => (
  `<li class="event__offer">
    <span class="event__offer-title">${title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
  </li>`
);

const createEventCardTemplate = ({type, dateFrom, dateTo, basePrice, isFavorite}, {name}, offers) => {
  const favoriteClassName = isFavorite ? 'event__favorite-btn--active' : '';
  const duration = dayjs(dateTo).diff(dateFrom);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime=${dayjs(dateFrom).format(DateFormat.DATETIME_ATTRIBUTE)}>${dayjs(dateFrom).format(DateFormat.MONTH_DAY)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${toCapitalize(type)} ${name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime=${dayjs(dateFrom).format(DateFormat.DATETIME_ATTRIBUTE)}>${dayjs(dateFrom).format(DateFormat.HOUR_MINUTES)}</time>
            &mdash;
            <time class="event__end-time" datetime=${dayjs(dateTo).format(DateFormat.DATETIME_ATTRIBUTE)}>${dayjs(dateTo).format(DateFormat.HOUR_MINUTES)}</time>
          </p>
          <p class="event__duration">${getAbbreviatedFormat(duration)}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offers.map((offer) => createOfferTemplate(offer)).join('')}
        </ul>
        <button class="event__favorite-btn ${favoriteClassName}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
  </li>`
  );
};

export default class EventCardView extends AbstractView {
  #point = null;
  #destination = null;
  #offers = null;
  #rollupButtonClickHandler = null;
  #favoriteButtonClickHandler = null;

  constructor (
    {
      point,
      destination,
      offers,
      onRollupButtonClick,
      onFavoriteButtonClick
    }
  ) {
    super ();
    this.#point = point;
    this.#destination = destination;
    this.#offers = offers;
    this.#rollupButtonClickHandler = onRollupButtonClick;
    this.#favoriteButtonClickHandler = onFavoriteButtonClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', (evt) => this.#rollupButtonClickHandler(evt));
    this.element.querySelector('.event__favorite-btn')
      .addEventListener('click', this.#favoriteButtonClickHandler);
  }

  get template () {
    return createEventCardTemplate(this.#point, this.#destination, this.#offers);
  }

}
