import DestinationsModel from './model/destinations-model';
import OffersModel from './model/offers-model';
import PointsModel from './model/points-model';
import EventPresenter from './presenter/event-presenter';

const tripMainElement = document.querySelector('.trip-main');
const filtersElement = tripMainElement.querySelector('.trip-controls__filters');
const eventsElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const eventPresenter = new EventPresenter(
  {
    tripMainContainer: tripMainElement,
    filterContainer: filtersElement,
    eventsContainer: eventsElement,
    pointsModel,
    destinationsModel,
    offersModel
  }
);

eventPresenter.init();
