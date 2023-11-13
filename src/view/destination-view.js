import {createElement} from '../render';

const createPhotoTemplate = () => '<img class="event__photo" src="img/photos/1.jpg" alt="Event photo">';

const createDestinationTemplate = () => (
  `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.</p>

    <div class="event__photos-container">
      <div class="event__photos-tape">
      ${createPhotoTemplate()}
      </div>
    </div>
  </section>`
);

export default class DestinationView {
  getTemplate () {
    return createDestinationTemplate();
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