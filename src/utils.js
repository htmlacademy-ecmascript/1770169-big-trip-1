import dayjs from 'dayjs';
import {DateFormat} from './const.js';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const MILLISECONDS_IN_HOUR = 3600000;
const MILLISECONDS_IN_DAY = 86400000;

const toCapitalize = (word) => {
  const lower = word.toLowerCase();
  return lower[0].toUpperCase() + lower.slice(1);
};

const getDestinationNames = (destinations) => [...new Set(destinations.map((destination) => destination.name))];

const getPriceSum = (points) => points.map((point) => point.basePrice).reduce((accumulator, value) => accumulator + value, 0);

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
  const textArray = text.toLowerCase().split(' ');

  if (textArray.length <= 2) {
    return textArray.join('-');
  }

  return textArray.slice(textArray.length - 2).join('-');
};

const updatePoints = (points, update) => points.map((point) => point.id === update.id ? update : point);

const sortByPrice = (a, b) => b.basePrice - a.basePrice;

const sortByTime = (a, b) => {
  const firstPointDuration = dayjs(a.dateTo).diff(a.dateFrom);
  const secondPointDuration = dayjs(b.dateTo).diff(b.dateFrom);
  return secondPointDuration - firstPointDuration;
};

const sortByOffersLength = (a, b) => b.offers.length - a.offers.length;

const sortByEventName = (a, b) => {
  if (a.type > b.type) {
    return 1;
  }
  if (a.type < b.type) {
    return -1;
  }
  return 0;
};

export {
  toCapitalize,
  getDestinationNames,
  getPriceSum,
  getAbbreviatedFormat,
  getLastTwoWords,
  updatePoints,
  sortByPrice,
  sortByTime,
  sortByOffersLength,
  sortByEventName
};
