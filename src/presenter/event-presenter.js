import EventListView from '../view/event-list-view';
import MessageView from '../view/message-view';
import InfoView from '../view/info-view';
import LoadingView from '../view/loading-view';
import SortListView from '../view/sort-list-view';
import EventCardPresenter from './event-card-presenter';
import NewEventCardPresenter from './new-event-card-presenter';
import UiBlocker from '../framework/ui-blocker/ui-blocker';
import {RenderPosition, render, remove} from '../framework/render';
import {sortByPrice, sortByDate, sortByTime} from '../utils/sort';
import {filter} from '../utils/filter';
import {ActionType, SortType, UpdateType, FilterType, TimeLimit} from '../const';
export default class EventPresenter {
  #eventListComponent = new EventListView();
  #loadingComponent = new LoadingView();
  #messageComponent = null;
  #sortComponent = null;
  #infoComponent = null;
  #tripMainContainer = null;
  #eventsContainer = null;
  #newEventCardPresenter = null;
  #eventCardPresenter = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #filterModel = null;
  #eventCardPresenters = new Map();
  #currentSortType = SortType.DAY;
  #currentFilterType = null;
  #isLoading = true;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor(
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
        return filteredPoints.sort(sortByDate);
    }
  }

  get destinations() {
    return this.#destinationsModel.destinations;
  }

  init() {
    this.#renderEventElements();
  }

  createNewPoint() {
    this.#filterModel.filter = {
      updateType: UpdateType.MAJOR,
      filterType: FilterType.EVERYTHING
    };
    this.#newEventCardPresenter.init();
  }

  #renderInfoElement() {
    this.#infoComponent = new InfoView(
      {
        points: this.points,
        destinations: this.destinations,
        offers: this.#offersModel.offers
      }
    );
    render(this.#infoComponent, this.#tripMainContainer, RenderPosition.AFTERBEGIN);
  }

  #renderSortElement() {
    this.#sortComponent = new SortListView(
      {
        currentSortType: this.#currentSortType,
        onFormClick: this.#formClickHandler
      }
    );
    render(this.#sortComponent, this.#eventsContainer);
  }

  #renderEventListElement() {
    render(this.#eventListComponent, this.#eventsContainer);
  }

  #renderLoader() {
    render(this.#loadingComponent, this.#eventsContainer);
  }

  #renderMessageElement(errorMessage) {
    this.#messageComponent = new MessageView({currentFilterType: this.#currentFilterType, errorMessage});
    render(this.#messageComponent, this.#eventsContainer);
  }

  #renderEventCards() {
    this.points.forEach((point) => this.#renderEventCard(point));
  }

  #renderEventCard(point) {
    this.#eventCardPresenter = new EventCardPresenter(
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
    this.#eventCardPresenter.init(point);

    this.#eventCardPresenters.set(point.id, this.#eventCardPresenter);
  }

  #renderEventElements() {
    const isNotEmpty = !!this.points.length;

    if (this.#pointsModel.error) {
      this.#renderMessageElement(this.#pointsModel.error);
      return;
    }

    if (this.#isLoading) {
      this.#renderLoader();
      return;
    }

    if (isNotEmpty) {
      this.#renderInfoElement();
      this.#renderSortElement();
    }

    this.#renderEventListElement();

    if (!isNotEmpty) {
      this.#renderMessageElement();
      return;
    }

    this.#renderEventCards();
  }

  #clearEventElements({resetSortType = false} = {}) {
    this.#eventCardPresenters.forEach((presenter) => presenter.removeComponent());
    this.#eventCardPresenters.clear();
    this.#newEventCardPresenter.close();

    remove(this.#infoComponent);
    remove(this.#sortComponent);
    remove(this.#loadingComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }

    if (this.#messageComponent) {
      remove(this.#messageComponent);
    }
  }

  #getDestination = (name) => this.#destinationsModel._getDestinationByName(name);

  #getOffers = (type) => this.#offersModel._getOffersByType(type);

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case ActionType.ADD_POINT:
        this.#newEventCardPresenter.setSaving();

        try {
          await this.#pointsModel._createPoint(updateType, update);
        } catch(err) {
          this.#newEventCardPresenter.setAborting();
        }
        break;
      case ActionType.UPDATE_POINT:
        this.#eventCardPresenters.get(update.id).setSaving();

        try {
          await this.#pointsModel._updatePoint(updateType, update);
        } catch(err) {
          this.#eventCardPresenters.get(update.id).setAborting();
        }
        break;
      case ActionType.DELETE_POINT:
        this.#eventCardPresenters.get(update.id).setDeleting();

        try {
          await this.#pointsModel._deletePoint(updateType, update);
        } catch(err) {
          this.#eventCardPresenters.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
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
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#clearEventElements();
        this.#renderEventElements();
        break;
    }
  };

  #formClickHandler = (evt) => {
    const sortType = evt.target.dataset.type;

    if (sortType === this.#currentSortType || sortType === SortType.EVENT || sortType === SortType.OFFER) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearEventElements();
    this.#renderEventElements();
  };

  #eventCardResetHandler = () => {
    this.#eventCardPresenters.forEach((presenter) => presenter.resetEventCard());
    this.#newEventCardPresenter.close();
  };
}
