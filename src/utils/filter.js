import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import {FilterType} from '../const';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => dayjs().isBefore(dayjs(point.dateFrom))),
  [FilterType.PAST]: (points) => points.filter((point) => dayjs().isAfter(dayjs(point.dateTo))),
  [FilterType.PRESENT]: (points) => points.filter((point) => dayjs().isSameOrAfter(dayjs(point.dateFrom)) && dayjs().isSameOrBefore(dayjs(point.dateTo)))
};

export {filter};
