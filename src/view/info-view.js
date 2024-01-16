import AbstractView from '../framework/view/abstract-view';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import {getDestinationNames, getPriceSum} from '../utils/point';

dayjs.extend(minMax);

const createInfoTemplate = (points, destinations, price) => {
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
    this.#calculatePrice();
    return createInfoTemplate(this.#points, this.#destinations, this.#calculatePrice());
  }

  #calculatePrice() {
    const offersId = [];
    const offers = [];
    this.#points.map((point) => point.offers).forEach((item) => offersId.push(...item));
    this.#offers.map((item) => item.offers).forEach((offer) => offers.push(...offer));
    const offersPrice = offersId.map((id) => {
      const offer = offers.find((item) => item.id === id);

      if (offer) {
        return offer.price;
      }
    });
    const pointPrice = this.#points.map((point) => point.basePrice);

    return getPriceSum(offersPrice.concat(pointPrice));
  }
}
