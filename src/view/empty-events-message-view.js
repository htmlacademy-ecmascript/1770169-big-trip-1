import AbstractView from '../framework/view/abstract-view.js';
import {FILTER_TYPE} from '../const.js';

const createEmptyEventsMessageTemplate = (filter) => `<p class="trip-events__msg">${FILTER_TYPE[filter]}</p>`;

export default class EmptyEventsMessageView extends AbstractView {
  #filter = null;
  constructor ({filterType}) {
    super();
    this.#filter = filterType;
  }

  get template () {
    return createEmptyEventsMessageTemplate(this.#filter);
  }
}
