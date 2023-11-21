import {createElement} from '../render';
import {FILTER_TYPE} from '../const.js';

const createEmptyEventsMessageTemplate = (filter) => `<p class="trip-events__msg">${FILTER_TYPE[filter]}</p>`;

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
