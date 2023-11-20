import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import {createElement} from '../render';
import {getDestinationNames, getPriceSum} from '../utils';

dayjs.extend(minMax);

const createInfoTemplate = (points, destinations) => {
  const destinationNames = getDestinationNames(destinations);
  const infoTitle = destinationNames.length <= 3 ?
    destinationNames.join(' &mdash; ') :
    `${destinationNames.at(0)} &mdash;...&mdash; ${destinationNames.at(-1)}`;
  const datesFrom = dayjs.min(points.map((point) => dayjs(point.dateFrom)));
  const datesTo = dayjs.max(points.map((point) => dayjs(point.dateTo)));
  const infoDate = datesFrom.format('MMM') === datesTo.format('MMM') ?
    `${datesFrom.format('MMM DD')}&nbsp;&mdash;&nbsp;${datesTo.format('DD')}` :
    `${datesFrom.format('MMM DD')}&nbsp;&mdash;&nbsp;${datesTo.format('MMM DD')}`;

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${infoTitle}</h1>

        <p class="trip-info__dates">${infoDate}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${getPriceSum(points)}</span>
      </p>
    </section>`
  );
};

export default class InfoView {
  constructor ({points, destinations}) {
    this.points = points;
    this.destinations = destinations;
  }

  getTemplate () {
    return createInfoTemplate(this.points, this.destinations);
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
