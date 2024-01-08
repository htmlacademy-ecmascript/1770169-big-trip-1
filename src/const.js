const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const EMPTY_MESSAGE_TYPE = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.FUTURE]: 'There are no future events now'
};

const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const DEFAULT_POINT = {
  type: 'taxi',
  dateFrom: null,
  dateTo: null,
  destination: {name: ''},
  basePrice: '',
  isFavorite: false,
  offers: {offers: []}
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
  MAJOR: 'major'
};

export {
  EMPTY_MESSAGE_TYPE,
  EVENT_TYPES,
  DEFAULT_POINT,
  DateFormat,
  FilterType,
  SortType,
  ActionType,
  UpdateType
};
