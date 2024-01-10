import {RenderPosition, render, remove} from '../framework/render.js';
import EventListView from '../view/event-list-view.js';
import EmptyEventsMessageView from '../view/empty-events-message-view.js';
import InfoView from '../view/info-view.js';
import SortListView from '../view/sort-list-view.js';
import EventCardPresenter from './event-card-presenter.js';
import {sortByPrice, sortByTime} from '../utils/utils.js';
import {filter} from '../utils/filter.js';
import {ActionType, SortType, UpdateType, FilterType} from '../const.js';
import NewEventCardPresenter from './new-event-card-presenter.js';
export default class EventPresenter {
  #eventListComponent = new EventListView();
  #emptyEventsMessageComponent = null;
  #sortComponent = null;
  #infoComponent = null;
  #tripMainContainer = null;
  #eventsContainer = null;
  #newEventCardPresenter = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #filterModel = null;
  #eventCardPresenters = new Map();
  #currentSortType = SortType.DAY;
  #currentFilterType = null;

  constructor (
    {
      tripMainContainer,
      eventsContainer,
      pointsModel,
      destinationsModel,
      offersModel,
      filterModel,
      onCloseClick
    }
  ) {
    this.#tripMainContainer = tripMainContainer;
    this.#eventsContainer = eventsContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;

    this.#newEventCardPresenter = new NewEventCardPresenter(
      {
        destinationsModel: this.#destinationsModel,
        offersModel: this.#offersModel,
        eventListContainer: this.#eventListComponent,
        getDestination: this.#getDestination,
        getOffers: this.#getOffers,
        onEventCardChange: this.#handleViewAction,
        onCloseClick
      }
    );

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    const points = [...this.#pointsModel.points];
    this.#currentFilterType = this.#filterModel.filter;
    const filteredPoints = filter[this.#currentFilterType](points);

    switch (this.#currentSortType) {
      case SortType.TIME:
        return filteredPoints.sort(sortByTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortByPrice);
      default:
        return filteredPoints;
    }
  }

  get destinations() {
    return this.#destinationsModel.destinations;
  }

  init() {
    this.#renderEventElements();
  }

  #renderInfoElement() {
    this.#infoComponent = new InfoView(
      {
        points: this.points,
        destinations: this.destinations
      }
    );
    render(this.#infoComponent, this.#tripMainContainer, RenderPosition.AFTERBEGIN);
  }

  #renderSortElement() {
    this.#sortComponent = new SortListView(
      {
        currentSortType: this.#currentSortType,
        onFormClick: this.#sortFormClickHandler
      }
    );
    render(this.#sortComponent, this.#eventsContainer);
  }

  #renderEventListElement() {
    render(this.#eventListComponent, this.#eventsContainer);
  }

  #renderEmptyEventsMessageElement() {
    this.#emptyEventsMessageComponent = new EmptyEventsMessageView({currentFilterType: this.#currentFilterType});
    render(this.#emptyEventsMessageComponent, this.#eventsContainer);
  }

  #renderEventCards() {
    this.points.forEach((point) => this.#renderEventCard(point));
  }

  #renderEventCard(point) {
    const eventCardPresenter = new EventCardPresenter(
      {
        destinationsModel: this.#destinationsModel,
        offersModel: this.#offersModel,
        eventListContainer: this.#eventListComponent,
        getDestination: this.#getDestination,
        getOffers: this.#getOffers,
        onEventCardChange: this.#handleViewAction,
        onEventCardReset: this.#eventCardResetHandler
      }
    );
    eventCardPresenter.init(point);

    this.#eventCardPresenters.set(point.id, eventCardPresenter);
  }

  #renderEventElements() {
    const isNotEmpty = !!this.points.length;

    if (isNotEmpty) {
      this.#renderInfoElement();
      this.#renderSortElement();
    }

    this.#renderEventListElement();

    if (!isNotEmpty) {
      this.#renderEmptyEventsMessageElement();
      return;
    }

    this.#renderEventCards();
  }

  createNewPoint() {
    this.#filterModel.filter = {
      updateType: UpdateType.MAJOR,
      filterType: FilterType.EVERYTHING
    };
    this.#newEventCardPresenter.init();
  }

  #clearEventElements({resetSortType = false} = {}) {
    this.#eventCardPresenters.forEach((presenter) => presenter._removeComponent());
    this.#eventCardPresenters.clear();
    this.#newEventCardPresenter.close();

    remove(this.#infoComponent);
    remove(this.#sortComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }

    if (this.#emptyEventsMessageComponent) {
      remove(this.#emptyEventsMessageComponent);
    }
  }

  #getDestination = (name) => this.#destinationsModel._getDestinationsByName(name);

  #getOffers = (type) => this.#offersModel._getOffersByType(type);

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case ActionType.ADD_POINT:
        this.#pointsModel._addPoint(updateType, update);
        break;
      case ActionType.UPDATE_POINT:
        this.#pointsModel._updatePoint(updateType, update);
        break;
      case ActionType.DELETE_POINT:
        this.#pointsModel._deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, update) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventCardPresenters.get(update.id).init(update);
        break;
      case UpdateType.MINOR:
        this.#clearEventElements();
        this.#renderEventElements();
        break;
      case UpdateType.MAJOR:
        this.#clearEventElements({resetSortType: true});
        this.#renderEventElements();
        break;
    }
  };

  #sortFormClickHandler = (evt) => {
    if (!evt.target.matches('.trip-sort__btn')) {
      return;
    }
    const sortType = evt.target.dataset.type;

    if (sortType === this.#currentSortType || sortType === SortType.EVENT || sortType === SortType.OFFER) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearEventElements();
    this.#renderEventElements();
  };

  #eventCardResetHandler = () => {
    this.#eventCardPresenters.forEach((presenter) => presenter._resetEventCard());
    this.#newEventCardPresenter.close();
  };
}
