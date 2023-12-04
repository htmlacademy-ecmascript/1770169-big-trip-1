import {RenderPosition, render} from '../framework/render';
import EventListView from '../view/event-list-view';
import EmptyEventsMessageView from '../view/empty-events-message-view';
import FilterListView from '../view/filter-list-view';
import InfoView from '../view/info-view';
import SortListView from '../view/sort-list-view';
import EventCardPresenter from './event-card-presenter';
import {updatePoints, sortByPrice, sortByTime, sortByOffersLength, sortByEventName} from '../utils';
import {SortType} from '../const.js';
export default class EventPresenter {
  #filterValue = null;
  #eventListComponent = new EventListView();
  #tripMainContainer = null;
  #filterContainer = null;
  #eventsContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #points = null;
  #destinations = null;
  #offers = null;
  #eventCardPresenters = new Map();
  #originalPoints = [];
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

  init() {
    this.#points = this.#pointsModel.points;
    this.#destinations = this.#destinationsModel.destinations;
    this.#offers = this.#offersModel.offers;
    this.#renderEventElements();
    this.#originalPoints = [...this.#points];
  }

  #renderEventElements () {
    if (this.#points.length) {
      this.#renderInfoElement();
    }

    this.#renderFilterElement();

    if (this.#points.length) {
      this.#renderSortElement();
    }

    this.#renderEventListElement();

    if (!this.#points.length) {
      this.#renderEmptyEventsMessageElement();
      return;
    }

    this.#renderEventCards();
  }

  #renderInfoElement() {
    render(new InfoView(
      {
        points: this.#points,
        destinations: this.#destinations
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

  #sortEvents (sortType) {
    switch (sortType) {
      case SortType.EVENT:
        this.#points.sort(sortByEventName);
        break;
      case SortType.TIME:
        this.#points.sort(sortByTime);
        break;
      case SortType.PRICE:
        this.#points.sort(sortByPrice);
        break;
      case SortType.OFFER:
        this.#points.sort(sortByOffersLength);
        break;
      default:
        this.#points = [...this.#originalPoints];
    }
  }

  #renderEventListElement() {
    render(this.#eventListComponent, this.#eventsContainer);
  }

  #renderEmptyEventsMessageElement () {
    render(new EmptyEventsMessageView({filterType: this.#filterValue}), this.#eventsContainer);
  }

  #renderEventCards () {
    for (let i = 0; i < this.#points.length; i++) {
      this.#renderEventCard(this.#points[i]);
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

  #formClickHandler = (evt) => {
    if (!evt.target.matches('.trip-sort__btn')) {
      return;
    }
    const sortType = evt.target.dataset.type;

    if (sortType === this.#currentSortType) {
      return;
    }
    this.#sortEvents(sortType);
    this.#clearEventCards();
    this.#renderEventCards();
    this.#currentSortType = sortType;
  };

  #eventCardChangeHandler = (update) => {
    this.#points = updatePoints(this.#points, update);
    this.#originalPoints = updatePoints(this.#points, update);
    this.#eventCardPresenters.get(update.id).init(update);
  };

  #eventCardResetHandler = () => {
    this.#eventCardPresenters.forEach((presenter) => presenter._resetEventCard());
  };
}
