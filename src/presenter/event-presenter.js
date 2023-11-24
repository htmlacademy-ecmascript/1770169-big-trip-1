import {RenderPosition, render, replace} from '../framework/render';
import EventCardView from '../view/event-card-view';
import EventEditView from '../view/event-edit-view';
import EventListView from '../view/event-list-view';
import FilterListView from '../view/filter-list-view';
import InfoView from '../view/info-view';
import SortListView from '../view/sort-list-view';
import {getDestinationNames} from '../utils';
export default class EventPresenter {
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

  init () {
    this.#renderEventElements();
  }

  #renderEventElements () {
    this.#points = this.#pointsModel.points;
    this.#destinations = this.#destinationsModel.destinations;
    this.#offers = this.#offersModel.offers;

    render(new InfoView(
      {
        points: this.#points,
        destinations: this.#destinations
      }
    ), this.#tripMainContainer, RenderPosition.AFTERBEGIN);
    render(new FilterListView(), this.#filterContainer);
    render(new SortListView(), this.#eventsContainer);
    render(this.#eventListComponent, this.#eventsContainer);

    for (let i = 0; i < this.#points.length; i++) {
      this.#renderEventCard(this.#points[i]);
    }
  }

  #renderEventCard (point) {
    let isEventOpen = false;
    const documentKeydownHandler = (evt) => {
      if (evt.key === 'Escape') {
        hideEventEdit();
      }
    };

    const formSubmitHandler = () => {
      hideEventEdit();
    };

    const rollupButtonClickHandler = () => {
      if (isEventOpen) {
        return hideEventEdit();
      }
      return showEventEdit();
    };

    function showEventEdit () {
      replaceEventCard();
      document.addEventListener('keydown', documentKeydownHandler);
      isEventOpen = true;
    }

    function hideEventEdit () {
      replaceEventEdit();
      document.removeEventListener('keydown', documentKeydownHandler);
      isEventOpen = false;
    }

    const eventCardComponent = new EventCardView(
      {
        point: point,
        destination: this.#destinationsModel._getDestinationsById(point.destination),
        offers: this.#offersModel._getOfferItemsById(point.type, point.offers),
        onRollupButtonClick: rollupButtonClickHandler
      }
    );

    const eventEditComponent = new EventEditView(
      {
        point: point,
        destination: this.#destinationsModel._getDestinationsById(point.destination),
        availableCities: getDestinationNames(this.#destinations),
        offers: this.#offersModel._getOffersByType(point.type),
        checkedOffers: point.offers,
        onFormSubmit: formSubmitHandler,
        onRollupButtonClick: rollupButtonClickHandler
      }
    );

    function replaceEventCard () {
      replace(eventEditComponent, eventCardComponent);
    }

    function replaceEventEdit () {
      replace(eventCardComponent, eventEditComponent);
    }

    render(eventCardComponent, this.#eventListComponent.element);
  }
}
