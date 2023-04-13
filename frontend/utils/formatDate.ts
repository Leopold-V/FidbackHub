import dayjs from 'dayjs';

export const formatDateToDisplay = (date: Date | string): string => {
  return dayjs(date).format('llll').toString();
};
