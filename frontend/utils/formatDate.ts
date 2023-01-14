import dayjs from 'dayjs';

export const formatDateToDisplay = (date) => {
  return dayjs(date).format('llll').toString();
};
