import dayjs from 'dayjs';

const sortByPrice = (a, b) => b.basePrice - a.basePrice;

const sortByTime = (a, b) => {
  const firstPointDuration = dayjs(a.dateTo).diff(a.dateFrom);
  const secondPointDuration = dayjs(b.dateTo).diff(b.dateFrom);
  return secondPointDuration - firstPointDuration;
};

export {sortByPrice, sortByTime};
