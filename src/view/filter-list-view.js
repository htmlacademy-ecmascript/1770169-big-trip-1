import AbstractView from '../framework/view/abstract-view.js';
import {FILTER_TYPES} from '../const.js';

const createFilterTemplate = (filterType) => (
  `<div class="trip-filters__filter">
    <input id="filter-${filterType}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filterType}">
    <label class="trip-filters__filter-label" for="filter-${filterType}">${filterType}</label>
  </div>`
);

const createFilterListTemplate = () => (
  `<form class="trip-filters" action="#" method="get">
    ${FILTER_TYPES.map((item) => createFilterTemplate(item)).join('')}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
);

export default class FilterListView extends AbstractView {
  constructor ({onFilterChange}) {
    super();
    this.element.addEventListener('change', onFilterChange);
  }

  get template () {
    return createFilterListTemplate();
  }
}
