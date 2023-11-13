import EventPresenter from './presenter/event-presenter';

const filtersElement = document.querySelector('.trip-controls__filters');
const eventsElement = document.querySelector('.trip-events');

const eventPresenter = new EventPresenter(
  {
    filterContainer: filtersElement,
    eventsContainer: eventsElement
  }
);

eventPresenter.init();
