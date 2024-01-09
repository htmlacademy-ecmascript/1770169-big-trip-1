import {render, replace, remove} from '../framework/render';
import FilterListView from '../view/filter-list-view';
import {UpdateType} from '../const';

export default class FilterPresenter {
  #filterContainer = null;
  #filterComponent = null;
  #filterModel = null;

  constructor({filterContainer, filterModel}) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;

    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filterType () {
    return this.#filterModel.filter;
  }

  init() {
    const prevFilterComponent = this.#filterComponent;
    this.#filterComponent = new FilterListView(
      {
        currentFilterType: this.filterType,
        onFilterChange: this.#filterChangeHandler
      }
    );

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #filterChangeHandler = (evt) => {
    if (evt.target.matches('.trip-filters__filter-input')) {
      if (this.#filterModel.filter === evt.target.value) {
        return;
      }

      this.#filterModel.filter = {
        updateType: UpdateType.MAJOR,
        filterType: evt.target.value
      };
    }
  };
}
