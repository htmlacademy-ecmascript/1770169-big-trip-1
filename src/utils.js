import dayjs from 'dayjs';
import {DateFormat} from './const.js';

const MILLISECONDS_IN_SECONDS = 1000;
const SECONDS_IN_HOUR = 3600;
const SECONDS_IN_DAY = 86400;

const toCapitalize = (word) => {
  const lower = word.toLowerCase();
  return lower[0].toUpperCase() + lower.slice(1);
};

const getDestinationNames = (destinations) => [...new Set(destinations.map((destination) => destination.name))];

const getPriceSum = (points) => points.map((point) => point.basePrice).reduce((accumulator, value) => accumulator + value, 0);

const getAbbreviatedFormat = (milliseconds) => {
  if (milliseconds < MILLISECONDS_IN_SECONDS * SECONDS_IN_HOUR) {
    return dayjs(milliseconds).format(DateFormat.MINUTES_WITH_POSTFIX);
  }

  if (milliseconds < MILLISECONDS_IN_SECONDS * SECONDS_IN_DAY) {
    return dayjs(milliseconds).format(DateFormat.HOUR_MINUTES_WITH_POSTFIX);
  }

  if (milliseconds >= MILLISECONDS_IN_SECONDS * SECONDS_IN_DAY) {
    return dayjs(milliseconds).format(DateFormat.DAY_HOUR_MINUTES_WITH_POSTFIX);
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

export {toCapitalize, getDestinationNames, getPriceSum, getAbbreviatedFormat, getLastTwoWords, updatePoints};
