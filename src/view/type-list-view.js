import {createElement} from '../render';

const createTypeTemplate = () => (
  `<div class="event__type-item">
    <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
    <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
  </div>`
);

const createTypeListTemplate = () => (
  `<div class="event__type-list">
    <fieldset class="event__type-group">
      <legend class="visually-hidden">Event type</legend>
      ${createTypeTemplate()}
    </fieldset>
  </div>`
);

export default class TypeListView {
  getTemplate () {
    return createTypeListTemplate();
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
