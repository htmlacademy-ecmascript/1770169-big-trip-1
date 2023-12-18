import {RenderPosition, render} from '../framework/render';
import EventListView from '../view/event-list-view';
import EmptyEventsMessageView from '../view/empty-events-message-view';
import FilterListView from '../view/filter-list-view';
import InfoView from '../view/info-view';
import SortListView from '../view/sort-list-view';
import EventCardPresenter from './event-card-presenter';
import {sortByPrice, sortByTime} from '../utils';
import {ActionType, SortType, UpdateType} from '../const.js';
export default class EventPresenter {
  #filterValue = null;
  #eventListComponent = new EventListView();
  #tripMainContainer = null;
  #filterContainer = null;
  #eventsContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #eventCardPresenters = new Map();
  #currentSortType = SortType.DAY;

  constructor (
    {
      tripMainContainer,
      filterContainer,
      eventsContainer,
      pointsModel,
      destinationsModel,
      offersModel
    }
  ) {
    this.#tripMainContainer = tripMainContainer;
    this.#filterContainer = filterContainer;
    this.#eventsContainer = eventsContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  get points () {
    switch (this.#currentSortType) {
      case SortType.TIME:
        return [...this.#pointsModel.points].sort(sortByTime);
      case SortType.PRICE:
        return [...this.#pointsModel.points].sort(sortByPrice);
    }
    return this.#pointsModel.points;
  }

  get destinations () {
    return this.#destinationsModel.destinations;
  }

  init() {
    this.#renderEventElements();
  }

  #renderEventElements () {
    const count = this.points.length;

    if (count) {
      this.#renderInfoElement();
    }

    this.#renderFilterElement();

    if (count) {
      this.#renderSortElement();
    }

    this.#renderEventListElement();

    if (!count) {
      this.#renderEmptyEventsMessageElement();
      return;
    }

    this.#renderEventCards();
  }

  #renderInfoElement() {
    render(new InfoView(
      {
        points: this.points,
        destinations: this.destinations
      }
    ), this.#tripMainContainer, RenderPosition.AFTERBEGIN);
  }

  #renderFilterElement () {
    const filterChangeHandler = (evt) => {
      if (evt.target.matches('.trip-filters__filter-input')) {
        this.#filterValue = evt.target.value;
      }
    };

    render(new FilterListView({onFilterChange: filterChangeHandler}), this.#filterContainer);
  }

  #renderSortElement () {
    render(new SortListView({onFormClick: this.#formClickHandler}), this.#eventsContainer);
  }

  #renderEventListElement() {
    render(this.#eventListComponent, this.#eventsContainer);
  }

  #renderEmptyEventsMessageElement () {
    render(new EmptyEventsMessageView({filterType: this.#filterValue}), this.#eventsContainer);
  }

  #renderEventCards () {
    for (let i = 0; i < this.points.length; i++) {
      this.#renderEventCard(this.points[i]);
    }
  }

  #renderEventCard (point) {
    const eventCardPresenter = new EventCardPresenter(
      {
        destinationsModel: this.#destinationsModel,
        offersModel: this.#offersModel,
        eventListComponent: this.#eventListComponent,
        onEventCardChange: this.#eventCardChangeHandler,
        onEventCardReset: this.#eventCardResetHandler,
      }
    );
    eventCardPresenter.init(point);

    this.#eventCardPresenters.set(point.id, eventCardPresenter);
  }

  #clearEventCards () {
    this.#eventCardPresenters.forEach((presenter) => presenter._removeComponent());
    this.#eventCardPresenters.clear();
  }

  #handleViewAction (updateType, actionType, update) {
    switch (actionType) {
      case ActionType.ADD_TASK:
        this.#pointsModel._addPoint(updateType, update);
        break;
      case ActionType.UPDATE_TASK:
        this.#pointsModel._updatePoint(updateType, update);
        break;
      case ActionType.DELETE_TASK:
        this.#pointsModel._deletePoint(updateType, update);
        break;
    }
  }

  #handleModelEvent (updateType, update) {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventCardPresenters.get(update.id).init(update);
        break;
      case UpdateType.MINOR:
        break;
      case UpdateType.MAJOR:
        break;
    }
  }

  #formClickHandler = (evt) => {
    if (!evt.target.matches('.trip-sort__btn')) {
      return;
    }
    const sortType = evt.target.dataset.type;

    if (sortType === this.#currentSortType) {
      return;
    }
    this.#clearEventCards();
    this.#renderEventCards();
    this.#currentSortType = sortType;
  };

  #eventCardChangeHandler = (update) => {
    this.#eventCardPresenters.get(update.id).init(update);
  };

  #eventCardResetHandler = () => {
    this.#eventCardPresenters.forEach((presenter) => presenter._resetEventCard());
  };
}
