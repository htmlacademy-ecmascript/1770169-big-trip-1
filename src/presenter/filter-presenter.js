import {render, replace, remove} from '../framework/render';
import FilterListView from '../view/filter-list-view';
import {UpdateType, FilterType} from '../const';
import {filter} from '../utils/filter';

export default class FilterPresenter {
  #filterContainer = null;
  #filterComponent = null;
  #filterModel = null;
  #pointsModel = null;

  constructor({filterContainer, filterModel, pointsModel}) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filter() {
    const points = this.#pointsModel.points;
    const obj = {};
    Object.values(FilterType).forEach((type) => {
      obj[type] = filter[type](points).length;
    });
    return obj;
  }

  init() {
    const prevFilterComponent = this.#filterComponent;
    this.#filterComponent = new FilterListView(
      {
        filter: this.filter,
        currentFilterType: this.#filterModel.filter,
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
    if (this.#filterModel.filter === evt.target.value) {
      return;
    }

    this.#filterModel.filter = {
      updateType: UpdateType.MAJOR,
      filterType: evt.target.value
    };
  };
}
