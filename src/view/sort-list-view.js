import AbstractView from '../framework/view/abstract-view.js';
import {SortType} from '../const.js';

const createSortTemplate = (sortType) => {
  const checked = sortType === SortType.DAY ? 'checked' : '';

  return (
    `<div class="trip-sort__item  trip-sort__item--${sortType}">
      <input id="sort-${sortType}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sortType}" ${checked}>
      <label class="trip-sort__btn" for="sort-${sortType}" data-type=${sortType}>${sortType}</label>
    </div>`
  );
};

const createSortListTemplate = () => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${Object.values(SortType).map((item) => createSortTemplate(item)).join('')}
  </form>`
);

export default class SortListView extends AbstractView {
  #handlerFormClick = null;

  constructor ({onFormClick}) {
    super();
    this.#handlerFormClick = onFormClick;
    this.element.addEventListener('click', this.#handlerFormClick);
  }

  get template () {
    return createSortListTemplate();
  }
}
