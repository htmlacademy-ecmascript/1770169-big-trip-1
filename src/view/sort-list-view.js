import {createElement} from '../render';
import {SORT_TYPES} from '../const.js';

const createSortTemplate = (sortType) => (
  `<div class="trip-sort__item  trip-sort__item--${sortType}">
    <input id="sort-${sortType}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sortType}" checked>
    <label class="trip-sort__btn" for="sort-${sortType}">${sortType}</label>
  </div>`
);

const createSortListTemplate = () => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${SORT_TYPES.map((item) => createSortTemplate(item)).join('')}
  </form>`
);

export default class SortListView {
  getTemplate () {
    return createSortListTemplate();
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
