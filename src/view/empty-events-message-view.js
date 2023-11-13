import {createElement} from '../render';

const Filter = {
  everything: 'Click New Event to create your first point',
  past: 'There are no past events now',
  present: 'There are no present events now',
  future: 'There are no future events now'
};

const createEmptyEventsMessageTemplate = (filter) => `<p class="trip-events__msg">${Filter[filter]}</p>`;

export default class EmptyEventsMessageView {
  getTemplate () {
    return createEmptyEventsMessageTemplate();
  }

  getElement () {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement () {
    this.element = null;
  }
}
