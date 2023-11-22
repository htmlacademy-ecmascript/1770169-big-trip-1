import {RenderPosition, render} from '../framework/render';
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
    render(new EventEditView(
      {
        point: this.#pointsModel._getPointById(this.#points[0].id),
        destination: this.#destinationsModel._getDestinationsById(this.#points[0].destination),
        availableCities: getDestinationNames(this.#destinations),
        offers: this.#offersModel._getOffersByType(this.#points[0].type),
        checkedOffers: this.#points[0].offers
      }
    ), this.#eventListComponent.element);
    for (let i = 0; i < this.#points.length; i++) {
      render(new EventCardView(
        {
          point: this.#points[i],
          destination: this.#destinationsModel._getDestinationsById(this.#points[i].destination),
          offers: this.#offersModel._getOfferItemsById(this.#points[i].type, this.#points[i].offers)
        }
      ), this.#eventListComponent.element);
    }
  }
}
