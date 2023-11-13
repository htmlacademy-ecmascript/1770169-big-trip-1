import {createElement} from '../render';

const createFilterTemplate = () => (
  `<div class="trip-filters__filter">
    <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
    <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
  </div>`
);

const createFilterListTemplate = () => (
  `<form class="trip-filters" action="#" method="get">
    ${createFilterTemplate()}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
);

export default class FilterListView {
  getTemplate () {
    return createFilterListTemplate();
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
