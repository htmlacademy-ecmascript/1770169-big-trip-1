import AbstractView from '../framework/view/abstract-view';
import {EmptyMessageType} from '../const';

const createMessageTemplate = (currentFilterType, errorMessage) => (
  `<p class="trip-events__msg">${errorMessage ? errorMessage : EmptyMessageType[currentFilterType]}</p>`
);

export default class MessageView extends AbstractView {
  #currentFilterType = null;
  #errorMessage = null;

  constructor({currentFilterType, errorMessage = null}) {
    super();
    this.#currentFilterType = currentFilterType;
    this.#errorMessage = errorMessage;
  }

  get template() {
    return createMessageTemplate(this.#currentFilterType, this.#errorMessage);
  }
}
