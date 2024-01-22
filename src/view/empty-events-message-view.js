import AbstractView from '../framework/view/abstract-view';
import {EmptyMessageType} from '../const';

const createEmptyEventsMessageTemplate = (currentFilterType) => `<p class="trip-events__msg">${EmptyMessageType[currentFilterType]}</p>`;

export default class EmptyEventsMessageView extends AbstractView {
  #currentFilterType = null;

  constructor({currentFilterType}) {
    super();
    this.#currentFilterType = currentFilterType;
  }

  get template() {
    return createEmptyEventsMessageTemplate(this.#currentFilterType);
  }
}
