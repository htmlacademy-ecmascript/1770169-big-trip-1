import AbstractView from '../framework/view/abstract-view';

const createFilterTemplate = (filterType, pointsCount, currentFilterType) => {
  const checked = filterType === currentFilterType ? 'checked' : '';

  return (
    `<div class="trip-filters__filter">
      <input
        id="filter-${filterType}"
        class="trip-filters__filter-input visually-hidden"
        type="radio"
        name="trip-filter"
        value="${filterType}"
        ${checked}
        ${pointsCount === 0 ? 'disabled' : ''}>
      <label class="trip-filters__filter-label" for="filter-${filterType}">${filterType}</label>
    </div>`
  );
};

const createFilterListTemplate = (filter, currentFilterType) => (
  `<form class="trip-filters" action="#" method="get">
    ${Object.keys(filter).map((key) => createFilterTemplate(key, filter[key], currentFilterType)).join('')}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
);
export default class FilterListView extends AbstractView {
  #filter = null;
  #currentFilterType;
  #filterChangeHandler = null;

  constructor({filter, currentFilterType, onFilterChange}) {
    super();
    this.#filter = filter;
    this.#currentFilterType = currentFilterType;
    this.#filterChangeHandler = onFilterChange;
    this.element.addEventListener('change', this.#filterChangeHandler);
  }

  get template() {
    return createFilterListTemplate(this.#filter, this.#currentFilterType);
  }
}
