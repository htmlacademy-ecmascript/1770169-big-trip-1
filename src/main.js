import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import EventPresenter from './presenter/event-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewEventButtonView from './view/new-event-button-view.js';
import { render } from './framework/render.js';

const tripMainElement = document.querySelector('.trip-main');
const filtersElement = tripMainElement.querySelector('.trip-controls__filters');
const eventsElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const filterModel = new FilterModel();

const eventPresenter = new EventPresenter(
  {
    tripMainContainer: tripMainElement,
    filterContainer: filtersElement,
    eventsContainer: eventsElement,
    pointsModel,
    destinationsModel,
    offersModel,
    filterModel,
    onCloseClick: newEventCardCloseHandler
  }
);
const filterPresenter = new FilterPresenter(
  {
    filterContainer: filtersElement,
    filterModel
  }
);
const newEventButtonComponent = new NewEventButtonView({onButtonClick: newEventButtonClickHandler});

function newEventButtonClickHandler () {
  eventPresenter.createNewPoint();
  newEventButtonComponent.element.disabled = true;
}

function newEventCardCloseHandler () {
  newEventButtonComponent.element.disabled = false;
}

eventPresenter.init();
filterPresenter.init();
render(newEventButtonComponent, tripMainElement);
