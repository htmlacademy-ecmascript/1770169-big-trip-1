import AbstractView from '../framework/view/abstract-view.js';
import {FilterType} from '../const.js';

const createFilterTemplate = (filterType, currentFilterType) => {
  const checked = filterType === currentFilterType ? 'checked' : '';

  return (
    `<div class="trip-filters__filter">
      <input id="filter-${filterType}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filterType}" ${checked}>
      <label class="trip-filters__filter-label" for="filter-${filterType}">${filterType}</label>
    </div>`
  );
};

const createFilterListTemplate = (currentFilterType) => (
  `<form class="trip-filters" action="#" method="get">
    ${Object.values(FilterType).map((item) => createFilterTemplate(item, currentFilterType)).join('')}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
);

export default class FilterListView extends AbstractView {
  #currentFilterType;
  constructor ({currentFilterType, onFilterChange}) {
    super();
    this.#currentFilterType = currentFilterType;
    this.element.addEventListener('change', onFilterChange);
  }

  get template () {
    return createFilterListTemplate(this.#currentFilterType);
  }
}
