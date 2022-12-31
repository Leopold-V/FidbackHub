import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { ratingType } from 'types/index';

export const useDateFilterForRatings = (ratings: ratingType[]) => {
  const [dateRange, setdateRange] = useState({
    startDate: dayjs().subtract(7, 'day').format('YYYY-MM-DD'),
    endDate: dayjs(new Date()).format('YYYY-MM-DD'),
  });
  const [ratingsFiltered, setratingsFiltered] = useState(JSON.parse(JSON.stringify(ratings)));

  const filterRatings = (ratings: ratingType[]) => {
    const newRatings = ratings.filter(
      (ele) =>
        dayjs(ele.createdAt).isBetween(dayjs(dateRange.startDate), dayjs(dateRange.endDate), 'date', '[]') === true,
    );
    return newRatings;
  };

  useEffect(() => {
    const newRating = filterRatings(ratings);
    setratingsFiltered([...newRating]);
  }, [dateRange]);

  return [ratingsFiltered, dateRange, setdateRange];
};
