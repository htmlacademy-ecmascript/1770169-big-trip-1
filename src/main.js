import {render} from './framework/render';
import {API_URL, AUTH_TOKEN} from './const';
import PointApiService from './service/point-api-service';
import DestinationsApiService from './service/destinations-api-service';
import OffersApiService from './service/offers-api-service';
import DestinationsModel from './model/destinations-model';
import OffersModel from './model/offers-model';
import PointsModel from './model/points-model';
import FilterModel from './model/filter-model';
import EventPresenter from './presenter/event-presenter';
import FilterPresenter from './presenter/filter-presenter';
import NewEventButtonView from './view/new-event-button-view';

const tripMainElement = document.querySelector('.trip-main');
const filtersElement = tripMainElement.querySelector('.trip-controls__filters');
const eventsElement = document.querySelector('.trip-events');

const destinationsModel = new DestinationsModel({destinationsApiService: new DestinationsApiService(API_URL, AUTH_TOKEN)});
const offersModel = new OffersModel({offersApiService: new OffersApiService(API_URL, AUTH_TOKEN)});
const pointsModel = new PointsModel(
  {
    pointApiService: new PointApiService(API_URL, AUTH_TOKEN),
    destinationsModel,
    offersModel,
  }
);
const filterModel = new FilterModel();
const filterPresenter = new FilterPresenter(
  {
    filterContainer: filtersElement,
    filterModel,
    pointsModel
  }
);
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
const newEventButtonComponent = new NewEventButtonView({onButtonClick: newEventButtonClickHandler});

function newEventButtonClickHandler() {
  eventPresenter.createNewPoint();
  newEventButtonComponent.element.disabled = true;
}

function newEventCardCloseHandler() {
  newEventButtonComponent.element.disabled = false;
}

filterPresenter.init();
pointsModel.init();
eventPresenter.init();

render(newEventButtonComponent, tripMainElement);
