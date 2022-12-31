import React from 'react';
import { ratingType } from 'types/index';
import { RatingBarChart } from './RatingBarChart';
import { DateFilter } from './DateFilter';
import { Card } from 'components/common/Card';
import { DividerTitle } from 'components/common/DividerTitle';
import { useDateFilterForRatings } from '../../../hooks/useDateFilterForRatings';
import { DateButtonGroups } from './DateButtonsGroup';

export const BarChartSection = ({ ratings }: { ratings: ratingType[] }) => {
  const [ratingsFiltered, dateRange, setdateRange] = useDateFilterForRatings(ratings);

  return (
    <>
      <DividerTitle title="Categories" />
      <Card>
        <div className="flex flex-col items-center space-y-4">
          <div className="flex lg:flex-row flex-col items-center justify-between w-full">
            <div>
              <DateFilter dateRange={dateRange} setdateRange={setdateRange} />
            </div>
            <h2 className="py-2">Number of ratings by values</h2>
            <DateButtonGroups setdateRange={setdateRange} />
          </div>
          <div className="flex lg:flex-row flex-col justify-center items-center">
            <RatingBarChart title={'Design'} ratings={ratingsFiltered} ratingType="design" />
            <RatingBarChart title={'Speed'} ratings={ratingsFiltered} ratingType="speed" />
            <RatingBarChart title={'Responsive'} ratings={ratingsFiltered} ratingType="responsive" />
          </div>
        </div>
      </Card>
    </>
  );
};
