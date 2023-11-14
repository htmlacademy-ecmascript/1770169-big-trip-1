import EventPresenter from './presenter/event-presenter';

const tripMainElement = document.querySelector('.trip-main');
const filtersElement = tripMainElement.querySelector('.trip-controls__filters');
const eventsElement = document.querySelector('.trip-events');

const eventPresenter = new EventPresenter(
  {
    tripMainContainer: tripMainElement,
    filterContainer: filtersElement,
    eventsContainer: eventsElement
  }
);

eventPresenter.init();
