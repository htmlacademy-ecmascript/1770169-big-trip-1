import {render} from '../render';
import EventCardView from '../view/event-card-view';
import EventEditView from '../view/event-edit-view';
import EventListView from '../view/event-list-view';
import FilterListView from '../view/filter-list-view';
import SortListView from '../view/sort-list-view';

const EVENT_CARD_COUNT = 3;

export default class EventPresenter {
  eventListComponent = new EventListView();

  constructor ({filterContainer, eventsContainer}) {
    this.filterContainer = filterContainer;
    this.eventsContainer = eventsContainer;
  }

  init () {
    render(new FilterListView(), this.filterContainer);
    render(new SortListView(), this.eventsContainer);
    render(this.eventListComponent, this.eventsContainer);
    render(new EventEditView(), this.eventListComponent.getElement());
    for (let i = 0; i < EVENT_CARD_COUNT; i++) {
      render(new EventCardView(), this.eventListComponent.getElement());
    }
  }
}
