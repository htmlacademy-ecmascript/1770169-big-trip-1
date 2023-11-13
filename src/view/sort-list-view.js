import {createElement} from '../render';

const createSortTemplate = () => (
  `<div class="trip-sort__item  trip-sort__item--day">
    <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>
    <label class="trip-sort__btn" for="sort-day">Day</label>
  </div>`
);

const createSortListTemplate = () => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${createSortTemplate()}
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
