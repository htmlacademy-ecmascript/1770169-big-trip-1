import AbstractView from '../framework/view/abstract-view.js';
import {SortType} from '../const.js';

const createSortTemplate = (sortType, currentSortType) => {
  const checked = sortType === currentSortType ? 'checked' : '';

  return (
    `<div class="trip-sort__item  trip-sort__item--${sortType}">
      <input id="sort-${sortType}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sortType}" ${checked}>
      <label class="trip-sort__btn" for="sort-${sortType}" data-type=${sortType}>${sortType}</label>
    </div>`
  );
};

const createSortListTemplate = (currentSortType) => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${Object.values(SortType).map((item) => createSortTemplate(item, currentSortType)).join('')}
  </form>`
);

export default class SortListView extends AbstractView {
  #currentSortType;
  #handlerFormClick = null;

  constructor ({currentSortType, onFormClick}) {
    super();
    this.#currentSortType = currentSortType;
    this.#handlerFormClick = onFormClick;
    this.element.addEventListener('click', this.#handlerFormClick);
  }

  get template () {
    return createSortListTemplate(this.#currentSortType);
  }
}
