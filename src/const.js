import dayjs from 'dayjs';

const FILTER_TYPE = {
  everything: 'Click New Event to create your first point',
  past: 'There are no past events now',
  present: 'There are no present events now',
  future: 'There are no future events now'
};

const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const DEFAULT_OFFERS = {
  type: 'taxi',
  offers: [
    {
      title: 'Upgrade to a business class',
      price: 190
    },
    {
      title: 'Choose the radio station',
      price: 30
    },
    {
      title: 'Choose temperature',
      price: 170
    },
    {
      title: 'Drive quickly, I\'m in a hurry',
      price: 100
    },
    {
      title: 'Drive slowly',
      price: 110
    }
  ]
};

const DEFAULT_DESTINATION = {
  name: 'Chamonix',
  description: 'Chamonix, is a beautiful city, a true asian pearl, with a beautiful old town.',
  pictures: [
    {
      src: 'https://20.ecmascript.pages.academy/static/destinations/4.jpg',
      description: 'Chamonix embankment'
    },
    {
      src: 'https://20.ecmascript.pages.academy/static/destinations/8.jpg',
      description: 'Chamonix park'
    },
    {
      src: 'https://20.ecmascript.pages.academy/static/destinations/15.jpg',
      description: 'Chamonix kindergarten'
    },
    {
      src: 'https://20.ecmascript.pages.academy/static/destinations/16.jpg',
      description: 'Chamonix biggest supermarket'
    },
    {
      src: 'https://20.ecmascript.pages.academy/static/destinations/19.jpg',
      description: 'Chamonix street market'
    }
  ]
};

const DEFAULT_POINT = {
  type: 'taxi',
  dateFrom: dayjs(),
  dateTo: dayjs().hour(1),
  destination: DEFAULT_DESTINATION,
  basePrice: 10,
  isFavorite: false,
  offers: DEFAULT_OFFERS
};

const DateFormat = {
  DATETIME_ATTRIBUTE: 'YYYY-MM-DDTHH:mm',
  DAY: 'DD',
  MONTH: 'MMM',
  MONTH_DAY: 'MMM DD',
  HOUR_MINUTES: 'HH:MM',
  DAY_MONTH_YEAR: 'DD/MM/YY[&nbsp;]HH:mm',
  MINUTES_WITH_POSTFIX: 'mm[M]',
  HOUR_MINUTES_WITH_POSTFIX: 'HH[H] mm[M]',
  DAY_HOUR_MINUTES_WITH_POSTFIX: 'DD[D] HH[H] mm[M]'
};

const FilterTypes = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer'
};

export {FILTER_TYPE, EVENT_TYPES, DEFAULT_POINT, DateFormat, FilterTypes, SortType};
