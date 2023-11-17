import {RenderPosition, render} from '../render';
import EventCardView from '../view/event-card-view';
import EventEditView from '../view/event-edit-view';
import EventListView from '../view/event-list-view';
import FilterListView from '../view/filter-list-view';
import InfoView from '../view/info-view';
import SortListView from '../view/sort-list-view';

const EVENT_CARD_COUNT = 3;

export default class EventPresenter {
  eventListComponent = new EventListView();

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
    this.tripMainContainer = tripMainContainer;
    this.filterContainer = filterContainer;
    this.eventsContainer = eventsContainer;
    this.pointsModel = pointsModel;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
  }

  init () {
    this.points = this.pointsModel.getPoints();
    this.destinations = this.destinationsModel.getDestinations();
    this.offers = this.offersModel.getOffers();

    render(new InfoView(
      {
        points: this.points,
        destinations: this.destinations
      }
    ), this.tripMainContainer, RenderPosition.AFTERBEGIN);
    render(new FilterListView(), this.filterContainer);
    render(new SortListView(), this.eventsContainer);
    render(this.eventListComponent, this.eventsContainer);
    render(new EventEditView(), this.eventListComponent.getElement());
    for (let i = 0; i < EVENT_CARD_COUNT; i++) {
      render(new EventCardView(), this.eventListComponent.getElement());
    }
  }
}
