import AbstractView from '../framework/view/abstract-view';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import {getDestinationName, calculatedPrice} from '../utils/point';
import {MIN_FULL_VIEW_CITIES} from '../const';

dayjs.extend(minMax);

const createInfoTemplate = (points, destinations, price) => {
  const destinationsId = points.map((point) => point.destination);
  const startDestination = getDestinationName(destinations, destinationsId.at(0));
  const endDestination = getDestinationName(destinations, destinationsId.at(-1));
  const infoTitle = destinationsId.length <= MIN_FULL_VIEW_CITIES ?
    destinationsId.map((id) => getDestinationName(destinations, id)).join(' &mdash; ') :
    `${startDestination} &mdash;...&mdash; ${endDestination}`;
  const dateFrom = dayjs.min(points.map((point) => dayjs(point.dateFrom)));
  const dateTo = dayjs.max(points.map((point) => dayjs(point.dateTo)));
  const infoDate = dateFrom.isSame(dateTo, 'month') ?
    `${dateFrom.format('MMM DD')}&nbsp;&mdash;&nbsp;${dateTo.format('DD')}` :
    `${dateFrom.format('MMM DD')}&nbsp;&mdash;&nbsp;${dateTo.format('MMM DD')}`;

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${infoTitle}</h1>

        <p class="trip-info__dates">${infoDate}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
      </p>
    </section>`
  );
};

export default class InfoView extends AbstractView {
  #points = null;
  #destinations = null;
  #offers = null;

  constructor({points, destinations, offers}) {
    super();
    this.#points = points;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  get template() {
    return createInfoTemplate(this.#points, this.#destinations, calculatedPrice(this.#points, this.#offers));
  }
}
