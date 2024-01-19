import dayjs from 'dayjs';

const sortByPrice = (a, b) => b.basePrice - a.basePrice;

const sortByDate = (a, b) => dayjs(a.dateFrom).diff(dayjs(b.dateFrom));

const sortByTime = (a, b) => {
  const firstPointDuration = dayjs(a.dateTo).diff(a.dateFrom);
  const secondPointDuration = dayjs(b.dateTo).diff(b.dateFrom);
  return secondPointDuration - firstPointDuration;
};

export {sortByPrice, sortByDate, sortByTime};
