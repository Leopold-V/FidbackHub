import React from 'react';
import { Card } from 'components/common/Card';
import { DividerTitle } from 'components/common/DividerTitle';
import { ratingType } from 'types/index';
import { AverageChart } from './AverageChart';
import { DateFilter } from './DateFilter';
import { useDateFilterForRatings } from '../../../hooks/useDateFilterForRatings';
import { DateButtonGroups } from './DateButtonsGroup';

export const AverageChartSection = ({ ratings }: { ratings: ratingType[] }) => {
  const [ratingsFiltered, dateRange, setdateRange] = useDateFilterForRatings(ratings);

  return (
    <>
      <DividerTitle title="Progression" />
      <Card>
        <div className="flex flex-col items-center space-y-4">
          <div className="flex lg:flex-row flex-col items-center justify-between w-full">
            <div>
              <DateFilter dateRange={dateRange} setdateRange={setdateRange} />
            </div>
            <h2 className="py-2">Average ratings by day</h2>
            <DateButtonGroups setdateRange={setdateRange} />
          </div>
          <div className="my-2 w-full flex justify-center">
            <AverageChart ratings={ratingsFiltered} dateRange={dateRange} />
          </div>
        </div>
      </Card>
    </>
  );
};
