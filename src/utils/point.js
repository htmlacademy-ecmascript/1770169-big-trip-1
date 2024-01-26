import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {DateFormat, MILLISECONDS_IN_HOUR, MILLISECONDS_IN_DAY} from '../const';

dayjs.extend(duration);

const toCapitalize = (word) => {
  const lower = word.toLowerCase();
  return lower[0].toUpperCase() + lower.slice(1);
};

const getDestinationNames = (destinations) => [...new Set(destinations.map((destination) => destination.name))];

const getDestinationName = (destinations, id) => destinations.find((destination) => destination.id === id).name;

const getPriceSum = (priceList) => priceList.reduce((accumulator, value) => accumulator + value, 0);

const calculatedPrice = (points, offers) => {
  const offersId = [];
  const offersList = [];
  points.map((point) => point.offers).forEach((item) => offersId.push(...item));
  offers.map((item) => item.offers).forEach((offer) => offersList.push(...offer));
  const offersPrice = offersId.map((id) => {
    const offer = offersList.find((item) => item.id === id);

    if (offer) {
      return offer.price;
    }
  });
  const pointPrice = points.map((point) => point.basePrice);

  return getPriceSum(offersPrice.concat(pointPrice));
};

const getAbbreviatedFormat = (milliseconds) => {
  if (milliseconds < MILLISECONDS_IN_HOUR) {
    return dayjs.duration(milliseconds).format(DateFormat.MINUTES_WITH_POSTFIX);
  }

  if (milliseconds >= MILLISECONDS_IN_HOUR && milliseconds < MILLISECONDS_IN_DAY) {
    return dayjs.duration(milliseconds).format(DateFormat.HOUR_MINUTES_WITH_POSTFIX);
  }

  if (milliseconds >= MILLISECONDS_IN_DAY) {
    return dayjs.duration(milliseconds).format(DateFormat.DAY_HOUR_MINUTES_WITH_POSTFIX);
  }
};

const getLastTwoWords = (text) => {
  const words = text.toLowerCase().split(' ');

  if (words.length <= 2) {
    return words.join('-');
  }

  return words.slice(words.length - 2).join('-');
};

const isEscape = (evt) => evt.key === 'Escape';

export {
  toCapitalize,
  getDestinationNames,
  getDestinationName,
  getAbbreviatedFormat,
  getLastTwoWords,
  isEscape,
  calculatedPrice
};
