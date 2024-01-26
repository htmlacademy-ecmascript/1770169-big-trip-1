const API_URL = 'https://20.ecmascript.pages.academy/big-trip';
const AUTH_TOKEN = 'Basic wGtu7hacTxK0W9au';
const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const MILLISECONDS_IN_HOUR = 3600000;
const MILLISECONDS_IN_DAY = 86400000;
const MIN_FULL_VIEW_CITIES = 3;

const DEFAULT_POINT = {
  type: 'taxi',
  dateFrom: null,
  dateTo: null,
  destination: {name: ''},
  basePrice: '',
  isFavorite: false,
  offers: {offers: []}
};
const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};
const EmptyMessageType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.FUTURE]: 'There are no future events now'
};
const DateFormat = {
  DATETIME_ATTRIBUTE: 'YYYY-MM-DDTHH:mm',
  DAY: 'DD',
  MONTH: 'MMM',
  MONTH_DAY: 'MMM DD',
  HOUR_MINUTES: 'HH:MM',
  DATE_PICKER: 'd/m/y H:i',
  MINUTES_WITH_POSTFIX: 'mm[M]',
  HOUR_MINUTES_WITH_POSTFIX: 'HH[H] mm[M]',
  DAY_HOUR_MINUTES_WITH_POSTFIX: 'DD[D] HH[H] mm[M]'
};
const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer'
};
const ActionType = {
  ADD_POINT: 'addPoint',
  UPDATE_POINT: 'updatePoint',
  DELETE_POINT: 'deletePoint'
};
const UpdateType = {
  PATCH: 'patch',
  MINOR: 'minor',
  MAJOR: 'major',
  INIT: 'init'
};
const Path = {
  POINTS: 'points',
  OFFERS: 'offers',
  DESTINATIONS: 'destinations'
};
const Method = {
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete'

};
const ErrorMessage = {
  ERROR_CREATE_MESSAGE: 'Failed to create point',
  ERROR_UPDATE_MESSAGE: 'Failed to update point',
  ERROR_DELETE_MESSAGE: 'Failed to delete point',
  ERROR_OFFERS_MESSAGE: 'Failed to load offers',
  ERROR_DESTINATIONS_MESSAGE: 'Failed to load destinations',
  ERROR_SERVER_MESSAGE: 'Internal Server Error'
};
const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export {
  API_URL,
  AUTH_TOKEN,
  EVENT_TYPES,
  MILLISECONDS_IN_HOUR,
  MILLISECONDS_IN_DAY,
  MIN_FULL_VIEW_CITIES,
  DEFAULT_POINT,
  EmptyMessageType,
  DateFormat,
  FilterType,
  SortType,
  ActionType,
  UpdateType,
  Path,
  Method,
  ErrorMessage,
  TimeLimit
};
