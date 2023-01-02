import React from 'react';
import { Card } from 'components/common/Card';
import { DividerTitle } from 'components/common/DividerTitle';
import { feedbackType } from 'types/index';
import { ProgressLineChart } from './ProgressLineChart';
import { useDateFilterForFeedbacks } from '../../../hooks/useDateFilterForFeedbacks';
import { DateButtonGroups } from './DateButtonsGroup';

export const ProgressLineChartSection = ({ feedbacks }: { feedbacks: feedbackType[] }) => {
  const [feedbacksFiltered, dateRange, setdateRange] = useDateFilterForFeedbacks(feedbacks);
  return (
    <>
      <DividerTitle title="Progression" />
      <Card>
        <div className="flex flex-col mb-2 items-center space-y-4">
          <div className="flex lg:flex-row flex-col items-center justify-between w-full">
            <h2 className="pb-2 lg:pb-0">Number of feedbacks</h2>
            <DateButtonGroups setdateRange={setdateRange} />
          </div>
          <div className="w-full flex justify-center">
            <ProgressLineChart feedbacks={feedbacksFiltered} dateRange={dateRange} />
          </div>
        </div>
      </Card>
    </>
  );
};
