import dayjs from 'dayjs';

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
    return dayjs(milliseconds).format('mm[M]');
  }

  if (milliseconds < MILLISECONDS_IN_SECONDS * SECONDS_IN_DAY) {
    return dayjs(milliseconds).format('HH[H] mm[M]');
  }

  if (milliseconds >= MILLISECONDS_IN_SECONDS * SECONDS_IN_DAY) {
    return dayjs(milliseconds).format('DD[D] HH[H] mm[M]');
  }
};

export {toCapitalize, getDestinationNames, getPriceSum, getAbbreviatedFormat};
